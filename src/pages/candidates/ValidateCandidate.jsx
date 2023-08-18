import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { PropertyListItem } from '../../components/PropertyListItem';
import { PropertyItem } from '../../components/PropertyItem';

import { getSelectedPreRegister } from '../../redux/actions/preRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../../components/Title';

export const ValidateCandidate = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedPreRegister(id))
    }, [])

    const { preRegisterSelected } = useSelector((state) => state.preRegistration);

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
        updatedAt,
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
                items-center 
                justify-start
            `}>
                <div className={`
                    w-full 
                    md:w-6/12
                    md:mt-8
                    pt-12
                    md:pt-0 
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
            </div>
        </ContainerFull>
    )
}
