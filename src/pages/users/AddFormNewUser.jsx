import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

import { InputText } from '../../components/inputs/InputText';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { Button } from '../../components/buttons/Button';


import { createNewUser } from '../../redux/actions/users';

import { locationState, typeUserOptions } from '../../static/data';
import logo from '../../static/image/logo.png';
import { ComboBox } from '../../components/comboBox/ComboBox';
import { InputDate } from '../../components/inputDate/InputDate';
import { is } from 'date-fns/locale';

export const AddFormNewUser = ({ email, typeUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectDateBirth, setSelectDateBirth] = useState(null);

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

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            dateBirth: selectDateBirth,
        }));
    }, [selectDateBirth])
    
    const validateForm = (updateState) => {
        const { firstName, lastName, location, dateBirth, password, confirmPassword } = updateState;
        if (firstName.trim() === '') {
            toast.error('Ingresa tu nombre');
            return false;
        }
        if (lastName.trim() === '') {
            toast.error('Ingresa tu apellido paterno');
            return false;
        }
        if (location.trim() === '') {
            toast.error('Ingresa tu localidad');
            return false;
        }
        if (dateBirth === null) {
            toast.error('Ingresa tu fecha de nacimiento');
            return false;
        }
        if (password === '') {
            toast.error('Ingresa tu contraseña');
            return false;
        }
        if (confirmPassword === '') {
            toast.error('Confirma tu contraseña');
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return false;
        }

        return true;
    }


    const handleSubmitAddNewUser = () => {
        setLoading(true);
        const updateState = {...formData};
        updateState.typeUser = formData.typeUser.description
        updateState.location = formData.location.description
        const isValid = validateForm(updateState);
        if (isValid) {
            dispatch(createNewUser(updateState))
                .then((result) => {
                    if (result.status === 201) {
                        toast.success(result.message);
                        navigate('/');
                    }else{
                        toast.error(result.message);
                    }
                    setLoading(false);
                });
        }else{
            setLoading(false);
        }
    }

    const [findUserType, setFindUserType] = useState('');
    const filteredUserType = findUserType === ''
        ? typeUserOptions
        : typeUserOptions.filter((userType) =>
            userType.description
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(findUserType.toLowerCase().replace(/\s+/g, ''))
        );

    const [findLocation, setFindLocation] = useState('');
    const filteredLocations = findLocation === ''
        ? locationState
        : locationState.filter((location) =>
            location.description
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(findLocation.toLowerCase().replace(/\s+/g, ''))
        );



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
            <div className='flex flex-col lg:flex-row items-center mt-8'>
                <div className='w-full lg:w-8/12 mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10 lg:p-4'>
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
                    <div>
                        <h3 className="text-md font-semibold text-gray-900 mb-2">Seleciona a tu coordinador</h3>
                        <ComboBox
                            filterData={filteredUserType}
                            query={findUserType}
                            setQuery={setFindUserType}
                            selected={formData}
                            setSelected={setFormData}
                            placeholder='Seleciona un tipo de usuario'
                            property='typeUser'
                        />
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-900 mb-2">Lugar de residencia</h3>
                        <ComboBox
                            filterData={filteredLocations}
                            query={findLocation}
                            setQuery={setFindLocation}
                            selected={formData}
                            setSelected={setFormData}
                            placeholder='Selecione el estado donde vives'
                            property='location'
                        />
                    </div>
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
                <div className='w-full lg:w-4/12 mx-auto lg:p-4'>
                    <div>
                        <h3 className="text-md text-center font-semibold text-gray-900 my-8">Seleciona tu fecha naciemunto</h3>
                        <div className='w-full flex justify-center items-center'>
                            <InputDate
                                id={'dateExpired'}
                                selected={selectDateBirth}
                                onChange={setSelectDateBirth}
                            />
                        </div>
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
