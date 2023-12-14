import axios from '../api/axios';
// import useAuth from './useAuth';
import { refreshTokenSuccess } from '../redux/reducers/user'

export const useRefreshToken = () => {
    // const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh-token', {
            withCredentials: true
        });
        console.log(response)
        console.log(response.data.accessToken)
        refreshTokenSuccess(response.data)
        // setAuth(prev => {
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return {
        //         ...prev,
        //         roles: response.data.roles,
        //         accessToken: response.data.accessToken
        //     }
        // });
        return response.data.accessToken;
    }
    return refresh;
};

