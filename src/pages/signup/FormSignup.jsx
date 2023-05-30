import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import { Input } from '../../components/inputs/Input';
import { validate } from './validation';
import { Button } from '../../components/buttons/Button';




export const FormSignup = () => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },

    });
    const handleReset = () => {
        formik.resetForm();
    }

    return (
        <div
            className="
            min-h-screen 
            bg-gray-50 
            flex flex-col 
            justify-center 
            py-12 
            sm:px-6
            "
        >
            <div className="
                sm:mx-auto 
                sm:w-full 
                sm:max-w-xl
                bg-white 
                sm:py-8
                sm:px-20 
                sm:rounded-md
                shadow-md
                "
            >
                {/* Header form */}
                <div className="mb-16">
                    <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
                        Crear una cuenta
                    </h2>
                </div>
                {/* Body form */}
                <div
                    className="
                    grid 
                    grid-cols-1 
                    gap-y-4 
                    sm:grid-cols-6 
                    mb-16
                    "
                >
                    <div className="sm:col-span-6">
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            formik={formik}
                            value={formik.values.firstName}
                            error={formik.touched.firstName && formik.errors.firstName}
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            label="Apellido Paterno"
                            placeholder="Ingresa tu nombre"
                            formik={formik}
                            value={formik.values.lastName}
                            error={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="Correo electronico"
                            placeholder="Ingresa tu correo electronico"
                            formik={formik}
                            value={formik.values.email}
                            error={formik.touched.email && formik.errors.email}
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña"
                            formik={formik}
                            value={formik.values.password}
                            error={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirmar contraseña"
                            placeholder="Confirma tu contraseña"
                            formik={formik}
                            value={formik.values.confirmPassword}
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </div>
                </div>
                {/* Footer form */}
                <div>
                    <div
                        className="mt-6 flex items-center justify-around gap-x-6 mb-16"
                    >
                        <Button
                            label='Registrar'
                            onClick={() => formik.handleSubmit()}
                        />
                    </div>
                    <div className={`w-full`}>
                        <span>Ya tienes cuenta?</span>
                        <Link to="/login" className="text-indigo-700 pl-2">
                            Iniciar sesion
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

