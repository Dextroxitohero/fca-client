import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { InputText } from '../../components/inputs/InputText';
import logo from '../../static/image/logo.png';


export const FormForgetPassword = () => {
    const { activation_token } = useParams();
    console.log(activation_token)

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

    const handleLogin = () => {
        const { password, confirmPassword } = formData;
        //dispatch(signUp({ name, apellido, email, password }))
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
                                id={'password'}
                                name={'password'}
                                type={'password'}
                                label={'Nueva Contraseña'}
                                onChange={(e) => onChange(e)}
                                value={formData.password}
                                placeholder={'Nueva Contraseña'}
                                disabled={false}
                            />
                        </div>
                        <div>
                            <InputText
                                id={'confirmPassword'}
                                name={'confirmPassword'}
                                type={'password'}
                                label={'Confirma Tu Contraseña'}
                                onChange={(e) => onChange(e)}
                                value={formData.confirmPassword}
                                placeholder={'Confirma Tu Contraseña'}
                                disabled={false}
                            />
                        </div>
                        <div className='mt-8'>
                            <button
                                type='button'
                                className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-2.5 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                                onClick={handleLogin}
                            >{'Confirmar Contraseña'}</button>
                            {/* <Button label={"Agregar nuevo curso"} onClick={handleCreateCourse} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

