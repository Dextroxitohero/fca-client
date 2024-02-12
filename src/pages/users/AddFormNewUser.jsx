import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

import { InputText } from '../../components/inputs/InputText';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { Button } from '../../components/buttons/Button';


import { createNewUser } from '../../redux/actions/users';

import { locationState, typeUserOptions } from '../../static/data';
import logo from '../../static/image/logo.png';

export const AddFormNewUser = ({ email, typeUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        lastName: '',
        secondSurname: '',
        email: email,
        location: '',
        typeUser: typeUser,
        phone: '',
        dateBirth: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleDate = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dateBirth: date,
        }));
    }

    const validateForm = () => {
        const { firstName, lastName, location, dateBirth, password, confirmPassword } = formData;
        if(firstName.trim() === '') {
            toast.error('Ingresa tu nombre');
            return false;
        }
        if(lastName.trim() === '') {
            toast.error('Ingresa tu apellido paterno');
            return false;
        }
        if(location.trim() === '') {
            toast.error('Ingresa tu localidad');
            return false;
        }
        if(dateBirth === '') {
            toast.error('Ingresa tu fecha de nacimiento');
            return false;
        }
        if(password === '') {
            toast.error('Ingresa tu contraseña');
            return false;
        }
        if(confirmPassword === '') {
            toast.error('Confirma tu contraseña');
            return false;
        }

        if(password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return false;
        }

        return true;
    }


    const handleSubmitAddNewUser = () => {
        setLoading(true);
        const isValid = validateForm();
        if(isValid) {
            dispatch(createNewUser(formData))
                .then((result) => {
                    if (result.status === 201) {
                        toast.success(result.message);
                        navigate('/');
                    }
                    if (result.status !== 201) {
                        toast.error(result.message);                        
                    }
                    setLoading(false);
                });
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center py-4'>
                <div className='w-6/12 md:w-2/12'>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className='flex justify-center items-center mt-2'>
                <div className='w-10/12 mx-auto'>
                    <h1 className='text-2xl font-bold text-gray-950  text-center'>
                        Bienvenido a CFA
                    </h1>
                </div>
            </div>
            <div className='flex justify-center items-center mt-4'>
                <div className='w-10/12 mx-auto'>
                    <h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
                        Para continuar con el proceso de registro ingresa tus datos personales.
                    </h2>
                </div>
            </div>
            <div className='flex items-center mt-8'>
                <div className='w-10/12 mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
                    <div>
                        <InputText
                            id={'firstName'}
                            name={'firstName'}
                            type={'text'}
                            label={'Tu nombre'}
                            onChange={(e) => onChange(e)}
                            value={formData.firstName}
                            placeholder={'Ingresa tu nombre'}
                            disabled={false}
                        />
                    </div>
                    <div>
                        <InputText
                            id={'secondName'}
                            name={'secondName'}
                            type={'text'}
                            label={'Segundo nombre o nombres (opcional)'}
                            onChange={(e) => onChange(e)}
                            value={formData.secondName}
                            placeholder={'Ingresa tus segundo nombre (opcional)'}
                            disabled={false}
                        />
                    </div>
                    <div>
                        <InputText
                            id={'lastName'}
                            name={'lastName'}
                            type={'text'}
                            label={'Apellido Paterno'}
                            onChange={(e) => onChange(e)}
                            value={formData.lastName}
                            placeholder={'Ingresa tu apellido paterno'}
                            disabled={false}
                        />
                    </div>
                    <div>
                        <InputText
                            id={'secondSurname'}
                            name={'secondSurname'}
                            type={'text'}
                            label={'Apellido materno (opcional)'}
                            onChange={(e) => onChange(e)}
                            value={formData.secondSurname}
                            placeholder={'Ingresa tu apellido materno (opcional)'}
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
                            placeholder={'Ingresa tu correo electronico'}
                            disabled={true}
                        />
                    </div>
                    {/* <div>
                        <InputSelect
                            id="location"
                            name="location"
                            label="Seleciona tu ubicacion"
                            placeholder="Seleciona tu ubicacion"
                            data={locationState}
                            optionDefault="Seleciona tu ubicacion"
                            value={formData.location}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div>
                        <InputSelect
                            id="typeUser"
                            name="tyepUser"
                            label="Puesto"
                            placeholder="Seleciona el tipo de usuario"
                            data={typeUserOptions}
                            optionDefault="Seleciona el tipo de usuario"
                            value={formData.typeUser}
                            onChange={(e) => onChange(e)}
                            disabled={true}
                        />
                    </div> */}
                    <div>
                        <InputText
                            id={'phone'}
                            name={'phone'}
                            type={'text'}
                            label={'Telefono (opcional)'}
                            onChange={(e) => onChange(e)}
                            value={formData.phone}
                            placeholder={'Ingresa tu telefono'}
                            disabled={false}
                        />
                    </div>
                    {/* <div>
                        <InputDate
                            name={'dateBirth'}
                            label={'Fecha de nacimiento'}
                            onChange={(date) => handleDate(date)}
                            value={formData.dateBirth}
                            placeholder={'Ingresa tu fecha de nacimiento'}
                            disabled={false}
                        />
                    </div> */}
                    <div>
                        <InputText
                            id={'password'}
                            name={'password'}
                            type={'password'}
                            label={'Ingresa tu contraseña'}
                            onChange={(e) => onChange(e)}
                            value={formData.password}
                            placeholder={'Ingresa tu contraseña'}
                            disabled={false}
                        />
                    </div>
                    <div>
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
                </div>
            </div>
            <div className="flex w-full md:w-10/12 mx-auto justify-end mt-8">
                <Button
                    label={loading
                        ? <ButtonLoader />
                        : 'Crear usuario'
                    }
                    disabled={loading}
                    onClick={handleSubmitAddNewUser}
                />
            </div>
        </div>
    )
}
