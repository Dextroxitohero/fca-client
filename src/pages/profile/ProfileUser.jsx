import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ContainerFull } from "../../components/ContainerFull";
import { Wrapper } from "../../components/Wrapper";
import { Heading } from "../../components/Heading";
import { PropertyItem } from "../../components/PropertyItem";
import { PropertyListItem } from "../../components/PropertyListItem";
import { getUserById } from "../../redux/actions/users";
import { Title } from "../../components/Title";
import { capitalizarPalabras } from "../../common/upperCaseWord";
import { formatDate } from "../../common/formatDateText";

export const ProfileUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { userSelected } = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(getUserById(id))
    }, [])

    const {
        id: _id, firstName, lastName, email,
        phone, dateBirth, location,
        education, paymentDeadlineDate, matricula,
        typeUser
    } = userSelected;

    return (
        <ContainerFull>
            <Heading
                title={`Perfil de usuario`}
                center={false}
            />
            <div className="w-full flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[50%]">
                    <Wrapper>
                        <Title title={'Datos personales'} />
                        <PropertyListItem>
                            <PropertyItem
                                title={`Matricula`}
                                description={matricula}
                            />
                            <PropertyItem
                                title={`Nombre completo`}
                                description={capitalizarPalabras(`${firstName} ${lastName}`)}
                            />
                            <PropertyItem
                                title={`Correo electrónico`}
                                description={email}
                            />
                            <PropertyItem
                                title={`Telefono`}
                                description={phone}
                            />
                            <PropertyItem
                                title={`Fecha de nacieminto`}
                                description={capitalizarPalabras(formatDate(dateBirth))}
                            />
                            <PropertyItem
                                title={`Nivel de educacion`}
                                description={education}
                            />
                            <PropertyItem
                                title={`Ubicacion`}
                                description={capitalizarPalabras(location)}
                            />
                            {
                                typeUser === 'estudiante' && (
                                    <PropertyItem
                                        title={`Proximo fecha de pago`}
                                        description={capitalizarPalabras(formatDate(paymentDeadlineDate))}
                                    />
                                )
                            }

                        </PropertyListItem>


                    </Wrapper>

                </div>
                {
                    typeUser === 'estudiante' && (
                        <div className="w-full lg:w-[50%]">
                            <Wrapper>
                                <Title title={'Historial de pagos'} />

                            </Wrapper>

                        </div>
                    )
                }

            </div>
            {
                (typeUser === 'estudiante' || typeUser === 'profesor') && (
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                        <div className="w-full">
                            <Wrapper>
                                <Title title={'Historial de cursos'} />


                            </Wrapper>

                        </div>
                    </div>
                )
            }

        </ContainerFull>
    )
}
