import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { InputText } from '../../components/inputs/InputText';
import { loginUser } from '../../redux/actions/user';
import logo from '../../static/image/logo.png';

export const FormLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleLogin = () => {
        // const { email, password } = formData;
        const { email='tiras_lp@hotmail.com', password='Linkinlp' } = formData;
        dispatch(loginUser({ email, password }))
        navigate(from, { replace: true });
    }

    return (
        <div className='w-full flex flex-col h-screen justify-center items-center bg-white'>
            <div className='bg-white w-full h-5/6 border-none '>
                <div className='flex h-[20%] justify-center items-center'>
                    <div className='w-1/2'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='flex items-start py-20 h-[80%]'>
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
                                label={'Ingresa tu contraseñas'}
                                onChange={(e) => onChange(e)}
                                value={formData.password}
                                placeholder={'Ingresa tu contraseñas'}
                                disabled={false}
                            />
                        </div>
                        <div className='mt-8'>
                            <button
                                type='button'
                                className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-2.5 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                                onClick={handleLogin}
                            >{'Iniciar sesion'}</button>
                            {/* <Button label={"Agregar nuevo curso"} onClick={handleCreateCourse} /> */}
                        </div>
                        <div className='flex justify-center mt-2'>
                            <Link to={'/forget-password'}className='font-semibold text-indigo-600 text-sm'>Olvidaste tu contraseña?</Link>
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

