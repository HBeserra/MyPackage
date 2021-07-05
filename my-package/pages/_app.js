import Head from 'next/head';
import 'normalize.css/normalize.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@/styles/styles.global.scss'
import { useState } from 'react';
import { GlobalContextProvider } from '@/context/global';



function MyApp({ Component, pageProps }) {

    const [globalState, setGlobalState] = useState({})

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