import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { InputText } from '../../components/inputs/InputText';
import { loginUser } from '../../redux/actions/user';
import logo from '../../static/image/logo.png';
import { toast } from 'react-hot-toast';
import { validateEmail } from '../../common/validations';

export const FormLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const validateForm = () => {
        const { email, password } = formData;
        const emailValid = validateEmail(email);

        if(!emailValid){
            toast.error('Ingresa un correo electronico valido');
            setLoading(false);
            return false;
        }

        if (!emailValid && !password) {
            toast.error('Ingresa tu correo electronico y contraseña');
            setLoading(false);
            return false;
        }
        if (!emailValid) {
            toast.error('Ingresa tu correo electronico');
            setLoading(false);
            return false;
        }
        if (!password) {
            toast.error('Ingresa tu contraseña');
            setLoading(false);
            return false;
        }
        if (emailValid && password) {
            return true;
        }
    }

    const handleLogin = () => {
        setLoading(true);
        const { email, password } = formData;
        const isValid = validateForm();

        if (isValid) {
            dispatch(loginUser({ email, password }))
                .then((result) => {
                    if (result.status === 200) {
                        toast.success(result.message);
                        navigate(from, { replace: true });
                    }
                    if (result.status === 401) {
                        toast.error(result.message);

                    }
                    if (result.status === 404) {
                        toast.error(result.message);

                    }
                    setLoading(false);
                });
        }

    }

    return (
        <div className='w-full flex flex-col h-screen justify-center items-center bg-white'>
            <div className='bg-white w-full h-5/6 border-none '>
                <div className='flex h-[20%] justify-center items-center'>
                    <div className='w-1/2'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='flex items-start py-16 h-[80%]'>
                    <div className='w-[80%] mx-auto grid grid-cols-1 gap-4'>
                        <div>
                            <InputText
                                id={1}
                                name={'email'}
                                type={'email'}
                                label={'Correo electronico'}
                                onChange={(e) => onChange(e)}
                                value={formData.email}
                                placeholder={'Correo electronico'}
                                disabled={false}
                            />
                        </div>
                        <div className='mt-4'>
                            <InputText
                                id={2}
                                name={'password'}
                                type={'password'}
                                label={'Ingresa tu contraseña'}
                                onChange={(e) => onChange(e)}
                                value={formData.password}
                                placeholder={'Ingresa tu contraseña'}
                                disabled={false}
                            />
                        </div>
                        <div className='mt-8'>
                            <button
                                disabled={loading}
                                type='button'
                                className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white bg-indigo-600 w-full'
                                onClick={handleLogin}
                            >Iniciar sesion</button>
                        </div>
                        <div className='flex justify-center '>
                            <Link to={'/forget-password'} className='font-semibold text-gray-950 text-sm'>Tienes problemas para iniciar sesion?</Link>
                        </div>
                        <div className='mt-2 border-t-2 pt-6'>
                            <Link
                                to={'/pre-registro'}
                                className='block disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold bg-white ring-inset ring-4 ring-indigo-600 text-md text-gray-950 w-full hover:bg-indigo-600 hover:text-white text-center '>Crear una cuenta</Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className='text-sm text-gray-400'>
                <p>Derechos Reservados © Centro de Formación Académica 2023</p>
            </div>
        </div>
    );
};

