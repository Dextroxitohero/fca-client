import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/user";
import { toast } from "react-hot-toast";

export const FormLogin = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("tiras_lp@hotmail.com");
	const [password, setPassword] = useState("12345");
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }))
	};

	return (
		<div className="
			min-h-screen 
		bg-gray-50
			flex flex-col 
			justify-center 
			py-12 sm:px-6 
			lg:px-8
		"
		>
			<div className="
			sm:mx-auto 
			sm:w-full 
			sm:max-w-md
			"
			>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="sm:mx-auto sm:w-full mb-10 sm:max-w-md">
						<h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
							Iniciar sesion
						</h2>
					</div>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email address
							</label>
							<div className="mt-1">
								<input
									type="email"
									name="email"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1 relative">
								<input
									type={visible ? "text" : "password"}
									name="password"
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
								{visible ? (
									<AiOutlineEye
										className="absolute right-2 top-2 cursor-pointer"
										size={25}
										onClick={() => setVisible(false)}
									/>
								) : (
									<AiOutlineEyeInvisible
										className="absolute right-2 top-2 cursor-pointer"
										size={25}
										onClick={() => setVisible(true)}
									/>
								)}
							</div>
						</div>
						<div className={`${styles.noramlFlex} justify-end`}>
							<div className="text-sm">
								<a
									href=".forgot-password"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Olvidaste tu contrasena?
								</a>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
							>
								Enviar
							</button>
						</div>
						<div className={`${styles.noramlFlex} w-full`}>
							<h4>No tienes una cuenta?</h4>
							<Link to="/signup" className="text-indigo-700 pl-2">
								Crear cuenta
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

