import { useFormik } from 'formik';
import { Link } from "react-router-dom";

import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/buttons/Button';

import { validate } from './validation';

import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/user";

export const FormLogin = () => {

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: values => {
			const {email, password} = values;
			dispatch(loginUser({ email, password }))
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
						Iniciar sesion
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

				</div>

				{/* Footer form */}
				<div>
					<Button
						label='Iniciar Sesion'
						onClick={() => formik.handleSubmit()}
					/>
					<div className={`w-full`}>
						<span>No tienes cuenta?</span>
						<Link to="/signup" className="text-indigo-700 pl-2">
							Crear cuenta
						</Link>
					</div>
				</div>

			</div>
		</div>
	);
};

