export const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Tu nombre es requerido';
    } else if (values.firstName.length < 4) {
        errors.firstName = 'El nombre debe contener al menos 4 letras';
    }

    if (!values.lastName) {
        errors.lastName = 'Tu apellido es requerido';
    } else if (values.lastName.length < 4) {
        errors.lastName = 'El apellido paterno debe contener al menos 4 letras';
    }

    if (!values.email) {
        errors.email = 'El correo electronico es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'El correo no es valido';
    }

    if (!values.phone) {
        errors.phone = 'La contraseña es requerida';
    } else if (values.phone.length < 10) {
        errors.phone = 'El numero de telefono debe contener al menos 10 digitos';
    }
    
    if (!values.dateBirth) {
        errors.dateBirth = 'Fecha de nacimiento es requerida';
    }

    if (!values.location) {
        errors.location = 'El estado es requerido';
    }

    if (!values.education) {
        errors.education = 'La nivel de educacion es requerido';
    } 

    return errors;
};

