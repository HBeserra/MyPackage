import { Skeleton } from "@mui/material"
import { useRouter } from "next/router"

const CORREIOS = /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/


function Blog({ rastreio }) {
    const { isFallback } = useRouter()
    console.log({rastreio})
    if(!rastreio?.objetos || rastreio.objetos.lenght < 1 || !rastreio.objetos[0]?.tipoPostal )<>Não encontrado</>
    return (
        // <ul>
        //     {posts.map((post) => (
        //         <li key={post.id}>{post.title}</li>
        //     ))}
        // </ul>
        <>{isFallback? <Skeleton variant="text" />: <h1>{rastreio.objetos[0]?.tipoPostal.categoria}</h1>    }</>
    )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    const { codigo } = params

    if (!CORREIOS.test(codigo)) {
        return { notFound: true }
    }


    try {
        const res = await fetch('https://proxyapp.correios.com.br/v1/sro-rastro/' + codigo)
        const rastreio = await res.json()
        if(!rastreio?.objetos || rastreio.objetos.lenght < 1 || !rastreio.objetos[0]?.tipoPostal ) return  { notFound: true }

        return {
            props: {
                rastreio,
            },
            // Next.js will attempt to re-generate the page:
            revalidate: 60*60, // In seconds
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