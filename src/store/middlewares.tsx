import {createLogger} from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createRouterMiddleware } from "connected-next-router";
import {Middleware} from "redux";
import {env} from "#lib/helpers";


const middlewares: Middleware[] = [];

const logger = createLogger({
    duration: true,
    collapsed: true,
    colors: {
        title: () => '#139bfe',
        prevState: () => '#1c5faf',
        action: () => '#149945',
        nextState: () => '#a47104',
        error: () => '#ff0005',
    },
});

if (env.isDev()) {
    middlewares.push(logger);
}

export const sagaMiddleware = createSagaMiddleware();
export const routerMiddleware = createRouterMiddleware();

middlewares.push(sagaMiddleware, routerMiddleware);

export default middlewares;
