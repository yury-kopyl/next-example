import {takeEvery} from "@redux-saga/core/effects";
import {userTypes} from "#store/types/userTypes";

function* getUser() {
    console.log('Saga working!');
}

export default function* getUserSagas() {
    // yield takeEvery(userTypes.SET_USER, getUser);
}
