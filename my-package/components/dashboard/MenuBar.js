import style from './MenuBar.module.scss'
import theme from '../theme'
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import TitleText from '../TitleText'
import Timeline from './Timeline'
import Image from 'next/image'

const DefaultPackageParams = {
  code: null,
  type: null,
  lat: null,
  lon: null,
  deliveryForecast: null,
  updates: null
}

function MapImage(params) {
  const zoom = params.zoom || 15.0
  if (params.lat & params.lon) {
    const link = `https://api.mapbox.com/styles/v1/hbeserra/ckpprd2qu089z17qm3npvqn1l/static/pin-s+e02041(${params.lat},${params.lon})/${params.lat},${params.lon},${zoom},0/700x350?access_token=pk.eyJ1IjoiaGJlc2VycmEiLCJhIjoiY2twcHRqMDU2MDZ6cTJwbGVkeHExZXVkaCJ9.Gg9nUubaGQbxJvUA37lRGQ`
    return (<Image className={style.MapImage} src={link} height="500" width="600" quality="80" />)
  }
  return (<img />)
}

const statusMensage = {
  "created": [0, "EM PRODUÇÂO"],
  "posted": [1, "POSTADO"],
  "in_transit": [2, "EM TRANSITO"],
  "being_delivered": [3, "SAINDO PARA ENTREGA"],
  "delivered": [4, "ENTREGUE"],
  "archived": [5, "ENTREGUE"]
}



export default function MenuBar(params) {





  const packageData = params.package
  const type = (packageData?.trackingCode) ? "start" : "center";
  const title = (packageData?.trackingCode) ? packageData.trackingCode : "Selecione uma encomenda para ver os detalhes";

  var onDetails = true;

  const containerStyle = { borderColor: `${theme.light}`, "justifyContent": type, }

  const scrollStyle = {justifyContent: type}


  function handleClick(obj) {

  }
  
  if(packageData == 0) return (
    <div className={[style.autoHide,style.container].join(" ")} style={containerStyle}>
      <div className={style.headerButtons}>
        <button onClick={params.close} className={[style.headerButton, style.autoShow].join(' ')}>
          <BsArrowLeftShort size="2rem" />
        </button>

      </div>
      <div className={style.scroll} style={scrollStyle}>
        <h3 className={style.title}>{title}</h3>
      </div>
    </div>
  )

  return (
    <div className={style.container} style={containerStyle}>
      <div className={style.headerButtons}>
        <button onClick={params.close} className={[style.headerButton, style.autoShow].join(' ')}>
          <BsArrowLeftShort size="2rem" />
        </button>

      </div>
      <div className={style.scroll}>
        <MapImage lat="-46.662483426446414" lon="-23.554279509564086" />
        <h3 className={style.title}>{title}</h3>
        <div className={style.text}>
          <TitleText title="Status" text={statusMensage[packageData?.status][1]} />
          <TitleText className={style.title} title="Previsão de entrega" text={(statusMensage[packageData.status][0] < 4)? "00/00/0000" : null} />
          <TitleText title="Tipo de Entrega" text={packageData?.shippingType} />
          <Timeline trackingData={packageData?.trackingData}/>
        </div>
      </div>
    </div>
  )
}