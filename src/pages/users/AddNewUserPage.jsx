import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';

export const AddNewUserPage = () => {
    const { token } = useParams();
    console.log(token);
    const { email, typeUser } = jwtDecode(token);
    console.log(email)
    console.log(typeUser)
    return (
        <div>{`Email ${email} - Tipo de usuario${typeUser}`}</div>
    )
}
