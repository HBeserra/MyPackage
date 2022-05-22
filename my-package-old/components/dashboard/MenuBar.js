import style from './MenuBar.module.scss'
import theme from '../theme'
import { BsArrowLeftShort } from 'react-icons/bs'
import TitleText from '../TitleText'
import Timeline from './Timeline'
import { useGlobalContext } from '@/context/global'


import { MapImage } from './map/MapImage'

const DefaultPackageParams = {
  code: null,
  type: null,
  lat: null,
  lon: null,
  deliveryForecast: null,
  updates: null
}

const statusMensage = {
  "created": [0, "EM PRODUÇÃO"],
  "posted": [1, "POSTADO"],
  "in_transit": [2, "EM TRANSITO"],
  "being_delivered": [3, "SAINDO PARA ENTREGA"],
  "delivered": [4, "ENTREGUE"],
  "archived": [5, "ENTREGUE"]
}



export default function MenuBar(params) {

  const globalContext = useGlobalContext()

  const packageData = params.package
  const type = (packageData?.trackingCode) ? "start" : "center";
  const title = (packageData?.trackingCode) ? packageData?.title : "Selecione uma encomenda para ver os detalhes";

  var onDetails = true;

  const containerStyle = { borderColor: `${theme.light}`, "justifyContent": type, }

  const scrollStyle = { justifyContent: type }

  const headerButtonsStyle = {
    backgroundImage: `linear-gradient(${globalContext.themes[globalContext.theme].background}, ${globalContext.themes[globalContext.theme].background}FF )`,


  }


  if (packageData == 0) return (
    <div className={[style.autoHide, style.container].join(" ")} style={containerStyle}>
      <div style={headerButtonsStyle} className={style.headerButtons}>
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
        <MapImage location={packageData?.location} />
        <h3 className={style.title}>{title}</h3>
        <div className={style.text}>
          <TitleText title="Descrição" text={packageData?.description} />
          <TitleText title="Código de rastreio" text={packageData?.trackingCode} />
          <TitleText title="Status" text={statusMensage[packageData?.status][1]} />
          <TitleText className={style.title} title="Previsão de entrega" text={(statusMensage[packageData.status][0] < 4) ? "00/00/0000" : null} />
          <TitleText title="Tipo de Entrega" text={packageData?.shippingType} />
          <Timeline trackingData={packageData?.trackingData} />
        </div>
      </div>
    </div>
  )
}