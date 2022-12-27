import {applyMiddleware, compose, legacy_createStore as createStore, Middleware} from 'redux';
import {createWrapper} from "next-redux-wrapper";
import Router from 'next/router';
import {initialRouterState} from "connected-next-router";
import { env } from '#lib/helpers';
import middlewares, {sagaMiddleware} from '#store/middlewares';
import {rootReducer} from '#store/reducers';
import userSagas from "#store/sagas/userSagas";
import authSagas from "#store/sagas/authSagas";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__COMPOSE__?: typeof compose;
    }
}

const bindMiddleware = (middleware: Middleware[]) => {
    if (env.isDev()) {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

export const makeStore = (context) => {
    const { asPath } = context.ctx || Router.router || {};
    let initialState;

    if (asPath) {
        initialState = {
            router: initialRouterState(asPath)
        }
    }

    const store = createStore(rootReducer, initialState, bindMiddleware(middlewares));

    sagaMiddleware.run(userSagas);
    sagaMiddleware.run(authSagas);

    return store
}

export const wrappedStore = createWrapper(makeStore, { debug: true });
