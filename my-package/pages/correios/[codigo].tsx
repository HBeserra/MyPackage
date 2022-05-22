import { Button, Skeleton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';

const CORREIOS = /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/
function Blog({ rastreio }: any) {
    const { isFallback } = useRouter()
    console.log({ rastreio })

    let newVariable: any;
    newVariable = (typeof window !== "undefined") && window.navigator;
    const enableShare = newVariable && newVariable.share

    function share() {
        const shareData = {
            title: 'Sua encomenda esta chegando!',
            text: 'Rastreie sua encomenda agora com MY Package',
            url: window.location.href,
        }
        try {
            newVariable.share(shareData)
        } catch (error) {

        }
    }

    if (!rastreio?.objetos || rastreio.objetos.lenght < 1 || !rastreio.objetos[0]?.tipoPostal) <>Não encontrado</>
    if (isFallback) return <h1><Skeleton variant="text" width={210} /></h1>
    return (
        <Box sx={{ p: 5 }}>

            <Typography variant="subtitle2">Codigo de rastreio</Typography>
            <Typography variant="h4">{rastreio.objetos[0]?.codObjeto}</Typography>
            <Typography variant="subtitle2">Metodo de envio</Typography>
            <Typography variant="h6">{rastreio.objetos[0]?.tipoPostal.categoria}</Typography>
            {rastreio.objetos[0].eventos.map((evento:any, index:number) => <Box key={index} sx={{ p: 2 }}>
                <Typography variant="subtitle2">{new Date(evento.dtHrCriado).toLocaleString()}</Typography>
                <Typography variant="h6">{evento.descricao}</Typography>
            </Box>)}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
                <Button variant="outlined" disabled endIcon={<SaveIcon />}>
                    Salvar
                </Button>
                <Button variant="contained" disabled={!enableShare} startIcon={<ShareIcon />} onClick={share}>
                    Send
                </Button>
            </Box>
        </Box>
    )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }:any) {
    const { codigo } = params

    if (!CORREIOS.test(codigo)) {
        return { notFound: true }
    }


    try {
        const res = await fetch('https://proxyapp.correios.com.br/v1/sro-rastro/' + codigo)
        const rastreio = await res.json()
        if (!rastreio?.objetos || rastreio.objetos.lenght < 1 || !rastreio.objetos[0]?.tipoPostal) return { notFound: true }

        return {
            props: {
                rastreio,
            },
            // Next.js will attempt to re-generate the page:
            revalidate: 60 * 60, // In seconds
        }
    } catch (error) {
        // The Twitter API most likely died
        console.error(error)
        return { notFound: true }
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    return { paths: [], fallback: true }
}

export default Blog