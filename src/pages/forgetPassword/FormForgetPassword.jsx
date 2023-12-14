import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { InputText } from '../../components/inputs/InputText';
import logo from '../../static/image/logo.png';

import { jwtDecode } from 'jwt-decode';
import { updatedPassword } from '../../redux/actions/user';


export const FormForgetPassword = () => {
    const dispatch = useDispatch();
    const { token } = useParams();
    const { email } = jwtDecode(token);

    console.log(email)

    const [formData, setFormData] = useState({
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

    const matchPassword = () => {
        if (formData.password === formData.confirmPassword)
            return true;
        return false;
        
    }

    const handleUpdatePassword = () => {
        const match = matchPassword();
        if (match) {
            const password = formData.password;
            dispatch(updatedPassword({ email, password}))
        }
    }


    if (!email)
        return (
            <div>
                <h1>Tu enlace esta vencido genera uno nuevo.</h1>
            </div>
        );

    return (
        <div className='w-full flex flex-col h-screen justify-center items-center bg-white'>
            <div className='bg-white w-full h-4/6 border-none'>
                <div className='flex h-[20%] justify-center items-center'>
                    <div className='w-[300px]'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='flex items-start py-5 h-[80%]'>
                    <div className='w-[80%] md:w-[30%] mx-auto grid grid-cols-1 gap-4'>
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
                        <div className='mt-8'>
                            <button
                                type='button'
                                className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-2.5 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                                onClick={handleUpdatePassword}
                            >{'Confirmar cambio de contraseña'}</button>
                            {/* <Button label={"Agregar nuevo curso"} onClick={handleCreateCourse} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

