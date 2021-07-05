//import React, { useState, useRef } from 'react';

import Layout from '@/components/dashboard/Dashboard'
import { InputSwitch } from 'primereact/inputswitch';
import { useGlobalContext } from '@/context/global';

export default function Home() {

  const globalContext = useGlobalContext() // importa o contexto global do app

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center"
  }

  return (
    <>
      <div style={layoutStyle}>
        <InputSwitch checked={globalContext.theme} onChange={(e) => globalContext.setTheme(e.value, globalContext)} />
        <Layout />
      </div>
    </>
  )
}
