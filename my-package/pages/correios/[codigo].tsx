import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import { RWebShare } from "react-web-share";

const CORREIOS = /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/
function Blog({ rastreio }: any) {
    const { isFallback } = useRouter()
    console.log({ rastreio })

    if (!rastreio?.objetos || rastreio.objetos.lenght < 1 || !rastreio.objetos[0]?.tipoPostal) <>Não encontrado</>
    if (isFallback) return <h1><CircularProgress /></h1>
    return (
        <Box sx={{ p: 5, display: 'flex', flexDirection: "column", gap: 1 }}>

            <Typography variant="subtitle2">Codigo de rastreio</Typography>
            <Typography sx={{fontWeight: 'bold'}} variant="h4">{rastreio.objetos[0]?.codObjeto}</Typography>
            <Typography variant="subtitle2">Metodo de envio</Typography>
            <Typography variant="h6">{rastreio.objetos[0]?.tipoPostal.categoria}</Typography>
            {rastreio.objetos[0].eventos.map((evento: any, index: number) => <Box key={index} sx={{ py: 2, pl: 4, pr: 0 }}>
                <Typography variant="subtitle2">{new Date(evento.dtHrCriado).toLocaleString()}</Typography>
                <Typography sx={{color: index == 0 ? "primary.dark" :"secondary.dark", fontWeight: 'bold',textTransform: 'uppercase'}} variant="h6">{evento.descricao}</Typography>
                <Typography variant="subtitle2">{evento.unidade.endereco.uf} {evento.unidade.endereco.cidade}</Typography>
                
            </Box>)}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
                <Button variant="outlined" disabled endIcon={<SaveIcon />}>
                    Salvar
                </Button>

                <RWebShare
                    data={{
                        title: "Sua encomenda esta chegando!",
                        text: "Rastreie sua encomenda agora com MY Package",
                        url: (typeof window !== "undefined")? window?.location?.href : ''
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button variant="contained" disabled={(typeof window === "undefined") || !window?.location?.href} startIcon={<ShareIcon />} >
                        Enviar
                    </Button>
                </RWebShare>
            </Box>
        </Box>
    )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
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