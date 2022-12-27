import type { IronSessionOptions } from "iron-session";
import {UserResponse} from "#app/entities/userEntities";
import {env} from "#lib/helpers";

export const sessionOptions: IronSessionOptions = {
    password: env.cookieSecret,
    cookieName: "user",
    cookieOptions: {
        secure: env.isProd(),
    },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData {
        user?: UserResponse;
    }
}
