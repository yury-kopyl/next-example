import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {AxiosResponse} from "axios";
import { routerActions } from 'connected-next-router';
import {authTypes} from "#store/types/authTypes";
import {SignIn, SignUp} from "#app/entities/auth";
import {ActionCreator} from "#lib/helpers";
import api, {axiosInstance} from "#app/api";
import {UserResponse} from "#app/entities/userEntities";
import {userActions} from "#store/actions/userActions";


function* SetUser(status: number, data: UserResponse) {
    if (status === 200) {
        yield all([
            put(userActions.setUser(data)),
            put(routerActions.push('/coins')),
        ])
    }
}
function* signUp(body: ActionCreator<SignUp>): any {
    try {
        const {status, data}: AxiosResponse<UserResponse> = yield call(api.auth.signUp, body.payload);

        yield SetUser(status, data);
    } catch (e) {
        console.error(e);
    }
}

function* signIn(body: ActionCreator<SignIn>) {
    try {
        const {status, data}: AxiosResponse<UserResponse> = yield call(api.auth.signIn, body.payload);

        yield SetUser(status, data);
    } catch (e) {
        console.error(e);
    }
}

function* signOut() {
    try {
        const {status}: AxiosResponse = yield call(api.auth.signOut);

        if(status === 200) {
            yield all([
                put(userActions.unsetUser()),
                put(routerActions.push('/signin')),
            ]);
        }
    } catch (e) {
        console.error(e);
    }
}

export default function* authSagas() {
    yield all([
        takeEvery(authTypes.SIGN_UP, signUp),
        takeEvery(authTypes.SIGH_IN, signIn),
        takeEvery(authTypes.SIGN_OUT, signOut),
    ]);
}
