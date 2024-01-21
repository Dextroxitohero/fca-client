import { Link } from 'react-router-dom';
import { Wrapper } from '../../components/Wrapper';
import logo from '../../static/image/logo.png';


export const TokenInvalid = () => {
	return (
		<div className='flex w-11/12 md:w-5/12 mx-auto items-baseline md:items-center h-screen'>
			<Wrapper>
				<div className='flex justify-center items-center py-10'>
					<div className='w-1/3'>
						<img src={logo} alt="logo" />
					</div>
				</div>

				<div className='flex justify-center items-center mt-2'>
					<div className='w-10/12 mx-auto'>
						<h1 className='text-3xl sm:text-4xl font-bold text-gray-950  text-center'>
							Tu invitacion ya no es valida.
						</h1>
					</div>
				</div>
				<div className='flex justify-center items-center mt-4'>
					<div className='w-10/12 mx-auto'>
						<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
							Lo sentimos, el tiempo de registro se ha terminado y intenta de nuevo.
						</h2>
					</div>
				</div>
				<div className="flex w-full md:w-10/12 mx-auto justify-center mt-8">
					<Link
						to={'/'}
						className="rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
						Regresar al inicio
						<span
							className='ml-3'
							aria-hidden="true"
						>&rarr;
						</span>
					</Link>
				</div>
			</Wrapper>
		</div>
	)
}
