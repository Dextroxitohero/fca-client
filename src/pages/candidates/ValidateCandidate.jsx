import { Fragment, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { PropertyListItem } from '../../components/PropertyListItem';
import { PropertyItem } from '../../components/PropertyItem';

import { getSelectedPreRegister } from '../../redux/actions/preRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../../components/Title';
import { InputSelect } from '../../components/inputs/InputSelect'


import { useFormik } from 'formik';
import { validate } from './validation';

import { optionsAssessors } from '../../redux/actions/options';
import { Button } from '../../components/buttons/Button';


import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'



export const ValidateCandidate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

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


    const formik = useFormik({
        initialValues: {
            assessor: assessor ? assessor._id : ''
        },
        validate,
        onSubmit: values => {
            console.log(values)
            // dispatch(loginUser({ email, password }))
        },
    });


    const handleValidate = () => {
        setOpen(true)
        formik.handleSubmit()
    }

    if (!preRegisterSelected) {
        return null;
    }

    return (
        <ContainerFull>
            {/* Heading */}
            <Heading
                title={`Perfil de usuario de pre registro`}
                subtitle={`Examina y verifica la información proporcionada por el candidato. Si la información es correcta y confiable, procede a la validación.`}
                center={false}
            />
            {/* Property pre register user */}
            <div className='flex flex-col items-start justify-center md:flex-row md:gap-x-4 gap-y-8 mt-4 md:mt-6'>
                <div className='w-full md:w-3/5'>
                    <Title title='Informacion del preregistro' />
                    {/* {preRegisterSelected && ( */}
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
                            title={`Estatus del preregistro`}
                            description={`${status}`}
                        />
                        <PropertyItem
                            title={`Cuenta selecionada`}
                            description={`${account}`}
                        />
                        <PropertyItem
                            title={`Idioma seleccionado por el usuario`}
                            description={`${language}`}
                        />
                        <PropertyItem
                            title={`Fecha de registro`}
                            description={`${createdAt}`}
                        />
                    </PropertyListItem>
                </div>
                {/* Image payment*/}
                <div className='w-full md:w-2/5'>
                    <Title title='Comprobante de pago' center />
                    {/* Container image */}
                    <div className='mx-auto max-w-7xl'>
                        <div>
                            <img src={`${baseURLImage}${fileName}`} alt="" className="mx-auto w-11/12 flex-shrink-0 rounded-md shadow-md" />
                        </div>
                    </div>
                    {/* Property activation */}
                    <div className='mx-auto border-gray-950 w-full md:w-5/6 mt-5 md:mt-10'>
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

                        </ul>
                        <Button onClick={handleValidate} label={'Validar usuario'} />
                    </div>

                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-indigo-500" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Validar Candidato
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Estas seguro que quieres validar que la informacion es correcta
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                            onClick={handleValidate}
                                        >
                                            Validar
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </ContainerFull>
    )
}
