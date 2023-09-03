import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { PropertyListItem } from '../../components/PropertyListItem';
import { PropertyItem } from '../../components/PropertyItem';

import { getSelectedPreRegister } from '../../redux/actions/preRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../../components/Title';
import { InputSelect } from '../../components/inputs/InputSelect'

import { CreditCardIcon, UserIcon, CalendarIcon } from '@heroicons/react/20/solid';

import { languages, accounts } from '../../static/data';
import { useFormik } from 'formik';
import { validate } from './validation';

import { optionsAssessors } from '../../redux/actions/options';



export const ValidateCandidate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const baseURLImage = 'http://localhost:8000/uploads/images/';

    useEffect(() => {
        dispatch(getSelectedPreRegister(id))
    }, [])

    useEffect(() => {
        dispatch(optionsAssessors())
    }, []);

    const { preRegisterSelected } = useSelector((state) => state.preRegistration);
    const { assessors } = useSelector((state) => state.options);

    const {
        firstName, lastName, email,
        phone, dateBirth, location,
        education, language, status,
        createdAt, account, assessor,        
        fileName
    } = preRegisterSelected;

    console.log(preRegisterSelected)

    const formik = useFormik({
        initialValues: {
            assessor: assessor ? assessor._id : '',
            account: account ? account : '',
            language: language ? language : '',
        },
        validate,
        onSubmit: values => {
            console.log(values)
            // dispatch(loginUser({ email, password }))
        },
    });


    if (!preRegisterSelected) {
        return null;
    }

    return (
        <ContainerFull>
            {/* Heading */}
            <Heading
                title={`Perfil de usuario de pre registro`}
                subtitle={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit repellat facere obcaecati ab necessitatibus veniam sapiente iure expedita numquam qui.`}
                center={false}
            />
            {/* Property pre register user */}
            <div className='flex flex-col items-start justify-center  md:flex-row  md:gap-x-4 gap-y-8 mt-4 md:mt-6'>
                <div className='w-full'>
                    <Title title='Datos Personales' />
                    {preRegisterSelected && (
                        <PropertyListItem>
                            <PropertyItem
                                title={`Nombre completo`}
                                description={`${firstName} ${lastName}`}
                            />
                            <PropertyItem
                                title={`Email`}
                                description={`${email}`}
                            />
                            <PropertyItem
                                title={`Celular`}
                                description={`${phone}`}
                            />
                            <PropertyItem
                                title={`Fecha de nacimiento`}
                                description={`${dateBirth}`}
                            />
                            <PropertyItem
                                title={`Fecha de nacimiento`}
                                description={`${location}`}
                            />
                            <PropertyItem
                                title={`Nivel educativo`}
                                description={`${education}`}
                            />
                            <PropertyItem
                                title={`Lenguaje de interes`}
                                description={`${language}`}
                            />
                            <PropertyItem
                                title={`Estatus de pre registro`}
                                description={`${status}`}
                            />
                            <PropertyItem
                                title={`Fecha de solicitud`}
                                description={`${createdAt}`}
                            />
                            <PropertyItem
                                title={`Nombre de assesor`}
                                description={`
                                    ${assessor
                                        ? `${assessor?.firstName} ${assessor?.lastName}`
                                        : `Sin assesor`
                                    } 
                                `}
                            />
                            <PropertyItem
                                title={`Numero de cuenta`}
                                description={`
                                    ${account
                                        ? `${account}`
                                        : `Sin eleccion`
                                    } 
                                `}
                            />

                        </PropertyListItem>
                    )}
                </div>
                {/* Image payment*/}
                <div className='w-full'>
                    <Title title='Comprobante de pago' center />
                    {/* Container image */}
                    <div className='mx-auto max-w-7xl'>
                        <div>
                            <img src={`${baseURLImage}${fileName}`} alt="" className="mx-auto w-11/12 flex-shrink-0 rounded-md shadow-md" />
                        </div>
                    </div>
                    {/* Property activation */}
                    <div className='mx-auto border-gray-950 max-w-90 mt-5 md:mt-10'>
                        <ul role="list" className="divide-y divide-gray-100">

                            <li className="flex justify-between gap-x-6 py-5">
                                <div className="min-w-0 flex-auto">
                                    <InputSelect
                                        id="assessor"
                                        name="assessor"
                                        label={assessor ? 'El assesor asignado es' : 'Seleciona a tu assesor'}
                                        placeholder={assessor ? 'El assesor asignado es' : 'Seleciona a tu assesor'}
                                        formik={formik}
                                        data={assessors}
                                        optionDefault="Selecione un assessor"
                                        value={formik.values.assessor}
                                        error={formik.touched.assessor && formik.errors.assessor}
                                    />
                                </div>
                            </li>

                            <li className="flex justify-between gap-x-6 py-5">
                                <div className="min-w-0 flex-auto">
                                    <InputSelect
                                        id="account"
                                        name="account"
                                        label={account ? 'La cuenta seleccionada es' : 'Seleciona el numero de cuenta'}
                                        placeholder={account ? 'La cuenta seleccionada es' : 'Seleciona el numero de cuenta'}
                                        formik={formik}
                                        data={accounts}
                                        optionDefault="Selecione el numero de cuenta"
                                        value={formik.values.account}
                                        error={formik.touched.account && formik.errors.account}
                                    />
                                </div>
                            </li>

                            <li className="flex justify-between gap-x-6 py-5">
                                <div className="min-w-0 flex-auto">
                                    <InputSelect
                                        id="language"
                                        name="language"
                                        label={language ? 'El ' : 'Seleciona el numero de cuenta'}
                                        placeholder={language ? 'La cuenta seleccionada es' : 'Seleciona el numero de cuenta'}
                                        formik={formik}
                                        data={languages}
                                        optionDefault="Selecione el numero de cuenta"
                                        value={formik.values.language}
                                        error={formik.touched.language && formik.errors.language    }
                                    />
                                </div>
                            </li>

                            <li className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Fecha de registro</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{createdAt}</p>
                                    </div>
                                </div>
                            </li>
                            <li className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">TEST</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-900">TEST</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <div className="min-w-0 flex-auto">
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">TEST</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-900">TEST</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </ContainerFull>
    )
}
