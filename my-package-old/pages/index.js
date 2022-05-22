import Layout from '@/components/dashboard/Dashboard'
import MenuAppBar from '@/components/dashboard/MenuAppBar'
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

  return (
    <>
      <div style={layoutStyle}>
        <MenuAppBar />
        <Layout />
      </div>
    </>
  )
}




