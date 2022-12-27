import { actionCreator } from "#lib/helpers";
import {authTypes} from "#store/types/authTypes";
import {SignIn, SignUp} from "#app/entities/auth";

export const authActions = {
    signUp: (data: SignUp) => actionCreator(authTypes.SIGN_UP, data),
    signIn: (data: SignIn) => actionCreator(authTypes.SIGH_IN, data),
    signOut: () => actionCreator(authTypes.SIGN_OUT, null),
};
