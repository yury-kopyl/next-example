import { Map } from "immutable";
import {HYDRATE} from "next-redux-wrapper";
import {userTypes} from "#store/types/userTypes";
import {ActionCreator} from "#lib/helpers";


const initialState = Map({
    name: undefined,
    lastName: undefined,
    email: undefined,
});

export const userReducer = (state = initialState, action: ActionCreator<any>) => {
    const { payload, type } = action;

    switch (type) {
        case HYDRATE: {
            return { ...state, ...action.payload }
        }
        case userTypes.SET_USER: {
            const { name, lastName, email } = payload;
            return state.set("name", name).set("lastName", lastName).set("email", email);
        }
        case userTypes.UNSET_USER: {
            return initialState;
        }
        default:
            return state;
    }
}
