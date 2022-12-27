import {axiosInstance} from "#app/api/index";
import {SignIn, SignUp} from "#app/entities/auth";
import {UserResponse} from "#app/entities/userEntities";

const auth = {
    signUp(data: SignUp) {
        return axiosInstance.post<UserResponse>('/api/signup', data);
    },
    signIn(data: SignIn) {
        return axiosInstance.post<UserResponse>('/api/signin', data);
    },
    signOut() {
        return axiosInstance.post('/api/signout');
    },
}

export default auth;
