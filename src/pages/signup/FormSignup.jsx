import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { InputText } from '../../components/inputs/InputText';
import { signUp } from '../../redux/actions/user';
import logo from '../../static/image/logo.png';


export const FormSignup = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleLogin = () => {
        const { name, apellido, email, password, confirmPassword } = formData;
        dispatch(signUp({ name, apellido, email, password }))
    }

    return (
        <div className='w-full flex flex-col h-screen justify-center items-center bg-white'>
            <div className='bg-white w-full h-5/6 border-none '>
                <div className='flex h-[20%] justify-center items-center'>
                    <div className='w-1/2'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='flex items-start py-5 h-[80%]'>
                    <div className='w-[80%] mx-auto grid grid-cols-1 gap-4'>
                        <div>
                            <InputText
                                id={'name'}
                                name={'name'}
                                type={'text'}
                                label={'Nombre'}
                                onChange={(e) => onChange(e)}
                                value={formData.name}
                                placeholder={'Nombre'}
                                disabled={false}
                            />
                        </div>
                        <div>
                            <InputText
                                id={'apellido'}
                                name={'apellido'}
                                type={'text'}
                                label={'Apellido'}
                                onChange={(e) => onChange(e)}
                                value={formData.apellido}
                                placeholder={'Apellido'}
                                disabled={false}
                            />
                        </div>
                        <div>
                            <InputText
                                id={'email'}
                                name={'email'}
                                type={'email'}
                                label={'Correo Electronico'}
                                onChange={(e) => onChange(e)}
                                value={formData.email}
                                placeholder={'Correo Electronico'}
                                disabled={false}
                            />
                        </div>
                        <div className='mt-4'>
                            <InputText
                                id={'password'}
                                name={'password'}
                                type={'password'}
                                label={'Ingresa tu contraseñas'}
                                onChange={(e) => onChange(e)}
                                value={formData.password}
                                placeholder={'Ingresa tu contraseñas'}
                                disabled={false}
                            />
                        </div>
                        <div className='mt-4'>
                            <InputText
                                id={'confirmPassword'}
                                name={'confirmPassword'}
                                type={'password'}
                                label={'Confirma tu contraseña'}
                                onChange={(e) => onChange(e)}
                                value={formData.confirmPassword}
                                placeholder={'Confirma tu contraseña'}
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
                            <Link className='font-semibold text-indigo-600 text-sm' to={'/login'}>Ya tienes cuenta?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

