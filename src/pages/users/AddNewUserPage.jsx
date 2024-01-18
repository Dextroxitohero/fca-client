import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { Wrapper } from '../../components/Wrapper';

export const AddNewUserPage = () => {
    const { token } = useParams();
    console.log(token);

    try {
        const { email, typeUser } = jwtDecode(token);
      } catch (error) {
        return(
            <ContainerFull>
                <Wrapper>
                    <h1>Invitacion invalida</h1>
                </Wrapper>
            </ContainerFull>
        )
      }
    const { email, typeUser } = jwtDecode(token);


    if(!email){
        return(
            <ContainerFull>
                <Wrapper>
                    <h1>Invitacion invalida</h1>
                </Wrapper>
            </ContainerFull>
        )
    }

    return (
        <ContainerFull>
            <Heading
                title={`Lista de usuarios`}
                subtitle={`Muestra la lista de los todos los usuarios registrados en el sistema`}
                center={false}
            />

            {
                email && (
                    <Wrapper>
                        <h1>{email}</h1>
                    </Wrapper>
                )
            }
        </ContainerFull>
    )
}
