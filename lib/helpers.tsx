import * as crypto from "crypto";

export const env = {
    isDev: () => process.env.NODE_ENV !== 'production',
    isProd: () => process.env.NODE_ENV === 'production',
    jwtSecret: 'd92cb11eabeb828b823378c3e51adb42',
    cookieSecret: '142075fe6d1273870ee2d0056de2e3c6',
}

export interface ActionCreator<P> {
    payload: P;
    type: string;
}

export function actionCreator<P>(actionType: string, actionPayload: P): ActionCreator<P> {
    return {
        payload: actionPayload,
        type: actionType,
    };
}

export function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')) {
    return {
        salt,
        password: crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'),
    }
}

export function validatePassword(hashedPassword: string, password: string, salt: string) {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hashedPassword === hash;
}

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user') || '');

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}
