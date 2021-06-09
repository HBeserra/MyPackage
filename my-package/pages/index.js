import React, { useState, useRef } from 'react';
import Banner from '../components/home/Banner'
import Button from '../components/Button'
import Layout from '../components/dashboard/Dashboard'
function Name(params) {
  return(<h1>Ola, {params.name}</h1>)
}

export default function Home() {
  return (
    <Layout/>
  )
}
