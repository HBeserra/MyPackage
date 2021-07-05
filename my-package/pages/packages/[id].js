import { useRouter } from 'next/router'



//import TitleText from '../TitleText'
//import Timeline from './Timeline'




const Post = () => {

  const router = useRouter()
  const { id } = router.query

  return <p>Código do pacote: {id}</p>
}

export default Post