import {combineReducers} from "redux";
import {routerReducer as nextRouterReducer} from "connected-next-router";
import {initialRouterState} from "connected-next-router";
import {userReducer} from "#store/reducers/userReducer";
import {ActionCreator} from "#lib/helpers";
import {HYDRATE} from "next-redux-wrapper";


const combinedReducer = combineReducers({
    user: userReducer,
    router: nextRouterReducer,
});

export const rootReducer = (state = { router: initialRouterState() }, action: ActionCreator<any>) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }

        if (typeof window !== 'undefined' && state?.router) {
            nextState.router = state.router;
        }

        return nextState;
    } else {
        return combinedReducer(state, action);
    }
}
