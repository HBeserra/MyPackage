import Layout from '@/components/dashboard/Dashboard'

// import { useGlobalContext } from '@/context/global';


export default function Home() {

  // const globalContext = useGlobalContext() // importa o contexto global do app

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center"
  }

  // globalContext.setTheme("true", globalContext)
  //ola

  return (
    <>

      <div style={layoutStyle}>
        <Layout />
      </div>
    </>
  )
}
