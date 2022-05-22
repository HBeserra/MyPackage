import style from './MenuBar.module.scss'
import theme from '../../theme'
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import TitleText from '../Timeline'
import Timeline from '../Timeline'

import { MapImage } from '../map/MapImage'


const DefaultPackageParams = {
  code: null,
  type: null,
  lat: null,
  lon: null,
  deliveryForecast: null,
  updates: null
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
        <MapImage/>
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