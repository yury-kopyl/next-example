import { Map } from "immutable";
import {HYDRATE} from "next-redux-wrapper";
import {initialRouterState} from 'connected-next-router';
import {userTypes} from "#store/types/userTypes";
import {ActionCreator} from "#lib/helpers";
import { rootReducer } from "../reducers";


export const routerReducer = (state = { router: initialRouterState() }, action: ActionCreator<any>) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        if (typeof window !== 'undefined' && state?.router) {
            nextState.router = state.router
        }
        return nextState
    } else {
        return rootReducer(state, action)
    }
}
