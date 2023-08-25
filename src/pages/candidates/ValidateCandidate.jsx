import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { PropertyListItem } from '../../components/PropertyListItem';
import { PropertyItem } from '../../components/PropertyItem';

import { getSelectedPreRegister } from '../../redux/actions/preRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../../components/Title';

import { CreditCardIcon, UserIcon, CalendarIcon } from '@heroicons/react/20/solid';
import { InputSelectTail } from '../../components/inputs/InputSelectTail';
import { language as dataLenguage } from '../../static/data';

export const ValidateCandidate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedPreRegister(id))
    }, [])

    const { preRegisterSelected } = useSelector((state) => state.preRegistration);

    if (!preRegisterSelected) {
        return null;
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        dateBirth,
        location,
        education,
        language,
        status,
        createdAt,
        account,
        assessor,
        fileName
    } = preRegisterSelected;

    return (
        <ContainerFull>
            <Heading
                title={`Perfil de usuario de pre registro`}
                subtitle={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit repellat facere obcaecati ab necessitatibus veniam sapiente iure expedita numquam qui.`}
                center={false}
            />
            <div className={`
                flex 
                flex-col 
                items-start 
                justify-center 
                md:flex-row 
                md:gap-x-4
                gap-y-8
                mt-4
                md:mt-6
            `}>
                <div className={`
                    w-full 
                    bg-green-500
                `}>
                    <Title
                        title={`Datos Personales`}
                    />
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
                <div className={`
                    w-full 
                `}>
                    <Title
                        title={`Comprobante de pago`}
                        center
                    />
                    <div
                        className={`
                            mx-auto
                            border-dashed
                            border-2
                            border-gray-50
                            max-w-2xl
                            h-[500px]
                            
                        `}
                    >

                    </div>
                    <div
                        className={`
                            mx-auto
                            border-dashed
                            border-2
                            border-gray-50
                            max-w-2xl
                            h-[500px]
                            
                        `}
                    >

                        <div
                            className={`
                                mx-auto
                                w-full
                                md:w-11/12
                            `}
                        >
                            {preRegisterSelected && (

                                <div role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                    <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">
                                                    {`
                                                    ${assessor
                                                            ? `${assessor?.firstName} ${assessor?.lastName}`
                                                            : `Sin assesor`
                                                        }`}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">

                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </div>


                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <CreditCardIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>

                                </div>
                            )}

                            <InputSelectTail data ={dataLenguage} selected1={language} />

                            {/* <ul role="list" className="divide-y divide-gray-100">
                                {people.map((person) => (
                                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                            {person.lastSeen ? (
                                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                                </p>
                                            ) : (
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul> */}

                        </div>

                    </div>

                </div>
            </div>
        </ContainerFull>
    )
}
