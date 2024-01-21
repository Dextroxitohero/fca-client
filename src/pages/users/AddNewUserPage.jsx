import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';

import { TokenInvalid } from '../notFound/TokenInvalid';
import { ContainerFull } from '../../components/ContainerFull';
import { Wrapper } from '../../components/Wrapper';
import { AddFormNewUser } from './AddFormNewUser'

export const AddNewUserPage = () => {
    const { token } = useParams();

    try {
        const { email, typeUser } = jwtDecode(token);
        if (!email) {
            return (
                <TokenInvalid />
            )
        }

        return (
            <ContainerFull>
                {
                    email && (
                        <Wrapper>
                            <AddFormNewUser email={email} typeUser={typeUser}/>
                        </Wrapper>
                    )
                }
            </ContainerFull>
        )

    } catch (error) {
        return (
            <TokenInvalid />
        )
    }
}
