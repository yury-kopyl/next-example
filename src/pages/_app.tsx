import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type {AppProps} from 'next/app';
import {ConnectedRouter} from 'connected-next-router';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {NextPage} from "next";
import {Provider} from "react-redux";
import {ReactElement, ReactNode} from 'react';
import theme from "#app/styles/theme";
import {wrappedStore} from '#app/store';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({Component, ...rest}: AppPropsWithLayout) {
    const {store, props} = wrappedStore.useWrappedStore(rest);
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <Provider store={store}>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <ConnectedRouter>
                    {getLayout(
                        <Component {...props.pageProps} />
                    )}
                </ConnectedRouter>
            </ThemeProvider>
        </Provider>
    );
}
