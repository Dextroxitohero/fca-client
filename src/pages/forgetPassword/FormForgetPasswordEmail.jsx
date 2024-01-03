import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

import { forgotPasswordEmail } from '../../redux/actions/user';

import { InputText } from '../../components/inputs/InputText';
import { Wrapper } from '../../components/Wrapper';

import logo from '../../static/image/logo.png';

export const FormForgetPasswordEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSendEmail = () => {
        setLoading(true);
        const { email } = formData;
        if (!email) {
            toast.error('Ingresa tu correo electronico');
            setLoading(false);
        }
        if (email) {
            dispatch(forgotPasswordEmail(email))
                .then((result) => {
                    if (result.status === 200) {
                        toast.success(result.message);
                        navigate('/');
                    }
                    if (result.status === 400) {
                        toast.error(result.message);
                    }
                    setLoading(false);
                });
        }
    }

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
                        <h1 className='text-sm md:text-md font-normal text-gray-400 text-center'>Para recuperar tu contraseña ingresa tu correo electronico y sigue las intruciones del correo electronico.</h1>
                    </div>
                </div>
                <div className='flex items-center mt-8'>
                    <div className='w-10/12 mx-auto grid grid-cols-1 gap-4'>
                        <div>
                            <InputText
                                id={'email'}
                                name={'email'}
                                type={'email'}
                                label={'Correo Electronico'}
                                onChange={(e) => onChange(e)}
                                value={formData.email}
                                placeholder={'Ingresa tu correo electronico'}
                                disabled={false}
                            />
                        </div>
                        <div className='mt-2'>
                            <button
                                type='button'
                                disabled={loading}
                                className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white bg-indigo-600 w-full'
                                onClick={handleSendEmail}
                            >Solicitar nueva contraseña</button>
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

