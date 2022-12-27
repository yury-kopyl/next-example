import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "#lib/session";
import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";


export const serverSideProtected = (redirectUrl = '/protected', redirectIfLogged = false, skip = false) => withIronSessionSsr(async function (context) {
    const {user} = context.req.session;

    if (!skip && (!redirectIfLogged && !user || user && redirectIfLogged)) {
        return {
            redirect: {
                destination: redirectUrl,
                permanent: false,
            },
        }
    }

    return {
        props: user ? {user: user} : {},
    }
}, sessionOptions);


export function withServerSideProtected<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
    handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
    options: { redirectUrl?: string, redirectIfLogged?: boolean, skip?: boolean } = {
        redirectUrl: '/protected',
        redirectIfLogged: false,
        skip: false
    }
) {
    return withIronSessionSsr(async function (context) {
        const { skip, redirectIfLogged, redirectUrl } = options;
        const {user} = context.req.session;

        if (!skip && (!redirectIfLogged && !user || user && redirectIfLogged)) {
            return {
                redirect: {
                    destination: redirectUrl,
                    permanent: false,
                },
            }
        }

        const { props } = await handler(context);

        return {
            props: {
                ...props,
                ...user && { user },
            },
        }
    }, sessionOptions);
}
