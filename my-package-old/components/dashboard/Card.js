import style from './Card.module.scss'
import { BsArrowRightShort } from 'react-icons/bs'
import { ArchiveButton } from '../button/ButtonArchive'
import TitleText from '../TitleText'
import { useGlobalContext } from '@/context/global'

const tabs_status = {
  "created": [0, "em produção"],
  "posted": [1, "postado"],
  "in_transit": [2, "em transito"],
  "being_delivered": [3, "saindo para entrega"],
  "delivered": [4, "entregue"],
  "archived": [5, "entregue"]
}

const Tabs = function (params) {

  function status(num) {
    const colors = [params.theme.secondary, params.theme.primary, params.theme.dark]

    let state = tabs_status[params?.status][0] - num

    state = state > 2 ? 2 : state
    state = state < 0 ? 0 : state

    if (tabs_status[params?.status][0] == 0) state = 1

    const style = {
      backgroundColor: colors[state],
      order: num
    }


    return (style)

  }

  return (
    <div>
      <div className={style.tab_line}>
        <div style={status(0)} className={style.tab}></div>
        <div style={status(1)} className={style.tab}></div>
        <div style={status(2)} className={style.tab}></div>
      </div>
      <div className={style.tab_line}>
        <div className={style.tab_icon}></div>
        <p className={("title1", style.tab_title)}>{tabs_status[params.status][1]}</p>
        <div className={style.tab_icon}>
          <ArchiveButton enable={tabs_status[params?.status][0] > 3} onArchive={params.onArchive} />
        </div>

      </div>
    </div>
  )
}

const Info = function (params) {

  const tracking = params?.packageData?.trackingData
  const lastTracking = tracking[tracking.length - 1]
  const location = lastTracking?.local || lastTracking?.origem

  return (
    <div>
      <div className={style.row}>
        <TitleText title="Titulo" text={params?.packageData?.title} />

      </div>
      <div className={style.row}>
        <TitleText title="Código de rastreio" text={params?.packageData?.trackingCode} />
        <TitleText title="Tipo" text={params?.packageData?.shippingType} />
      </div>
      <div className={style.row}>
        <TitleText title="Local" text={location} />
      </div>
    </div>
  )
}


const ButtonBar = function (params) {

  return (
    <button className={style.bar} onClick={() => { params.onClick() }}>

      <div className={style.bar_icon}></div>
      <div>
        <p className={style.bar_text}>Ver mais</p>
      </div>
      <div className={style.bar_icon}><BsArrowRightShort size="100%" /></div>

    </button>

  )
}


export default function Card({ ...params }) {

  const globalContext = useGlobalContext()


  var divStyle = {
    order: tabs_status[params.packageData.status][0],
    backgroundColor: globalContext.themes[globalContext.theme]?.light
  };

  return (
    <div style={divStyle} className={[style.card, style[`order_${tabs_status[params.packageData.status][0]}`]].join(" ")} >
      <Tabs status={params.packageData.status} onArchive={params.onArchive} theme={globalContext.themes[globalContext.theme]} />
      <Info packageData={params.packageData} />
      <ButtonBar onClick={() => {
        params.onDetails(params.packageData);
      }} />
    </div>
  )
}