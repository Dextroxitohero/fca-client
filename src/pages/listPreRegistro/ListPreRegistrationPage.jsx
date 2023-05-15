// import React, { useState } from 'react';

// const Step = ({ text, isActive }) => {
//   return (
//     <div className={`p-4 ${isActive ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>
//       {text}
//     </div>
//   );
// };

// export const ListPreRegistrationPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleNextStep = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handlePrevStep = () => {
//     setCurrentStep((prevStep) => prevStep - 1);
//   };

//   const renderContent = () => {
//     switch (currentStep) {
//       case 1:
//         return <div>Contenido del paso 1</div>;
//       case 2:
//         return <div>Contenido del paso 2</div>;
//       case 3:
//         return <div>Contenido del paso 3</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <h2 className="sr-only">Steps</h2>
//       <div className="flex justify-between bg-gray-100">
//         <Step text="Step 1" isActive={currentStep === 1} />
//         <Step text="Step 2" isActive={currentStep === 2} />
//         <Step text="Step 3" isActive={currentStep === 3} />
//       </div>
//       <div className="mt-4">{renderContent()}</div>
//       <div className="flex justify-between mt-4">
//         {currentStep > 1 && (
//           <button
//             onClick={handlePrevStep}
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
//           >
//             Regresar
//           </button>
//         )}
//         {currentStep < 3 && (
//           <button
//             onClick={handleNextStep}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           >
//             Siguiente
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Step = ({ text, isActive }) => {
  return (
    <div className={`p-4 ${isActive ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>
      {text}
    </div>
  );
};

export const ListPreRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
    mode: 'onChange' // Habilita la validación en tiempo real
  });

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNextStep = handleSubmit((data) => {
    setCurrentStep((prevStep) => prevStep + 1);
  });

  const handlePrintData = () => {
    const formData = getValues();
    console.log(formData);
  };

  return (
    <div>
      <h2 className="sr-only">Steps</h2>
      <div className="flex justify-between bg-gray-100">
        <Step text="Step 1" isActive={currentStep === 1} onClick={() => handleStepClick(1)} />
        <Step text="Step 2" isActive={currentStep === 2} onClick={() => handleStepClick(2)} />
        <Step text="Step 3" isActive={currentStep === 3} onClick={() => handleStepClick(3)} />
      </div>
      <div className="mt-4">
        {currentStep === 1 && (
          <form id="preRegistrationForm" onSubmit={handleNextStep}>
            <input type="text" placeholder="Nombre" {...register('nombre', { required: true })} />
            {errors.nombre && <span>El nombre es requerido</span>}
            <button type="submit" disabled={!isValid}>Siguiente</button>
          </form>
        )}
        {currentStep === 2 && (
          <form id="preRegistrationForm" onSubmit={handleNextStep}>
            <input type="email" placeholder="Correo Electrónico" {...register('correo', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
            {errors.correo && <span>Ingrese un correo electrónico válido</span>}
            <button type="submit" disabled={!isValid}>Siguiente</button>
          </form>
        )}
        {currentStep === 3 && (
          <form id="preRegistrationForm">
            <input type="number" placeholder="Edad" {...register('edad', { required: true, min: 18 })} />
            {errors.edad && <span>Debe ser mayor de 18 años</span>}
            {isValid ? (
              <button type="button" onClick={handlePrintData}>Imprimir datos</button>
            ) : (
              <span>Complete el formulario correctamente</span>
            )}
          </form>
        )}
        {currentStep > 1 && (
          <button onClick={handlePrevStep}>Anterior</button>
        )}
      </div>
    </div>
  );
};

