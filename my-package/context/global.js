import { createContext, useContext } from 'react'
import colors from '@/components/theme'
// cria objeto de contexto
const ThemeContext = createContext()



export function pageContext(props) {

  const { globalState = null, setGlobalState = null } = props || false


  const value = {
    setTheme: (varTheme, globalState) => {
      let i = globalState
      i.theme = varTheme

      props.setGlobalState(i)
      window.localStorage.setItem("theme", varTheme)
    },
    theme: props?.globalState?.theme || false,
    themes: colors,
    globalState,
    setGlobalState
  }

  return value
}



// exporta o provedor de contexto
export function GlobalContextProvider(props) {
  const children = props.children

  const value = pageContext(props.value)


  return (
    <ThemeContext.Provider value={value}>
      <div style={{ background: value?.themes[value.theme]?.background, color: value?.themes[value.theme]?.text, height: "100vh", minHeight: "100vh" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}



//  Exporta  o useContext Hook
export function useGlobalContext() {
  return useContext(ThemeContext);
}
