import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { InputText } from '../../components/inputs/InputText';
import logo from '../../static/image/logo.png';
import { forgotPasswordEmail } from '../../redux/actions/user';


export const FormForgetPasswordEmail = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleLogin = () => {
        const { email } = formData;
        console.log(email)
        dispatch(forgotPasswordEmail({ email }));
        //dispatch(signUp({ name, apellido, email, password }))
    }

    return (
        <div className='w-full flex flex-col h-screen justify-center items-center bg-white'>
            <div className='bg-white w-full h-4/6 border-none '>
                <div className='flex h-[20%] justify-center items-center'>
                    <div className='w-1/2 md:w-3/12'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='flex items-start py-20 h-[80%]'>
                    <div className='w-[80%] md:w-[35%] mx-auto grid grid-cols-1 gap-4'>
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
                            <button
                                type='button'
                                className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-2.5 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                                onClick={handleLogin}
                            >{'Solicitar Nueva Contraseña'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

