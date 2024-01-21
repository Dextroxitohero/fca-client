import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useParams } from "react-router-dom";

import { updatedPassword } from '../../redux/actions/user';
import { jwtDecode } from 'jwt-decode';

import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { Wrapper } from '../../components/Wrapper';
import { InputText } from '../../components/inputs/InputText';

import logo from '../../static/image/logo.png';

export const FormForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const { email } = jwtDecode(token);

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const matchPassword = () => {
        if (formData.password.length === 0 || formData.confirmPassword.length === 0) {
            setLoading(false);
            toast.error('Ingresa tu nueva contraseña');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setLoading(false);
            toast.error('Las contraseñas no coinciden');
            return false;
        }
        if (formData.password === formData.confirmPassword) {
            return true;
        }
    }

    const handleUpdatePassword = () => {
        setLoading(true);
        const match = matchPassword();
        if (match) {
            const password = formData.password;
            dispatch(updatedPassword({ email, password }))
                .then((result) => {
                    if (result.status === 200) {
                        toast.success(result.message);
                        navigate('/');
                    }
                    setLoading(false);
                });
        }
    }


    if (!email)
        return (
            <div>
                <h1>Tu enlace esta vencido genera uno nuevo.</h1>
            </div>
        );

    return (
        <div className='flex w-11/12 md:w-5/12 mx-auto items-baseline md:items-center h-screen'>
            <Wrapper>
                <div className='flex justify-center items-center py-10'>
                    <div className='w-1/2'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <div className='w-10/12 mx-auto'>
                        <h1 className='text-sm md:text-md font-normal text-gray-400 text-center'>Ingresa tu nueva contraseña</h1>
                    </div>
                </div>
                <div className='flex items-center mt-8'>
                    <div className='w-10/12 mx-auto grid grid-cols-1 gap-4'>

                        <div>
                            <InputText
                                id={'password'}
                                name={'password'}
                                type={'password'}
                                label={'Nueva contraseña'}
                                onChange={(e) => onChange(e)}
                                value={formData.password}
                                placeholder={'Nueva contraseña'}
                                disabled={false}
                            />
                        </div>
                        <div>
                            <InputText
                                id={'confirmPassword'}
                                name={'confirmPassword'}
                                type={'password'}
                                label={'Confirma tu nueva contraseña'}
                                onChange={(e) => onChange(e)}
                                value={formData.confirmPassword}
                                placeholder={'Confirma tu nueva contraseña'}
                                disabled={false}
                            />
                        </div>

                        <div className='mt-2'>
                            <button
                                type='button'
                                disabled={loading}
                                className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white bg-indigo-600 w-full'
                                onClick={handleUpdatePassword}
                            >
                                {loading
                                    ? <ButtonLoader />
                                    : 'Confirmar cambio de contraseña'
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-8 mb-4'>
                    <Link to={'/'} className='font-semibold text-indigo-600 text-sm'><span className='text-gray-700'>Ya tienes una cuenta?  </span>Iniciar sesion</Link>
                </div>
            </Wrapper>
        </div>
    );
};

