import Head from 'next/head';
import 'normalize.css/normalize.css'



import '@/styles/styles.global.scss'
import { useEffect, useState } from 'react';
import { GlobalContextProvider, pageContext } from '@/context/global';



function MyApp({ Component, pageProps }) {

    const [globalState, setGlobalState] = useState({})

    useEffect(function () {
        const context = pageContext({ globalState, setGlobalState })

        const theme = window.localStorage.getItem("theme") || false

        context.setTheme(theme, context)
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>My Package</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="My Package gerênciador de vendas" />
                <meta name="theme-color" content="#f5f5f5" />
            </Head>
            <GlobalContextProvider value={{ globalState, setGlobalState }}>
                <Component {...pageProps} />
            </GlobalContextProvider>

        </>
    )
}

export default MyApp;