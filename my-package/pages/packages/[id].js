import { useRouter } from 'next/router'
const { rastrearEncomendas } = require('correios-brasil');

let codRastreio = ['PW639018542BR', 'PW935793588BR']; // array de códigos de rastreios

rastrearEncomendas(codRastreio)
const Post = () => {

  const router = useRouter()
  const { id } = router.query
  
  return <p>Codigo do pacote: {id}</p>
}

export default Post