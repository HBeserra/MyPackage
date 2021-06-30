import Link from 'next/link'
import style from './Card.module.scss'
import theme from '../theme'
import { BsArrowRightShort } from 'react-icons/bs'
import { ArchiveButton } from '../button/ButtonArchive'
import TitleText from '../TitleText'

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
        const colors = [style.tab,  style.active_tab, style.past_tab ]

        let state = tabs_status[params?.status][0] - num

        state = state > 2 ? 2 : state
        state = state < 0 ? 0 : state

        if(tabs_status[params?.status][0] == 0) state = 1

        return ([colors[state], style.tab].join(" "))

    }




    return (
        <div>
            <div className={style.tab_line}>
                <div className={status(0)}></div>
                <div className={status(1)}></div>
                <div className={status(2)}></div>
            </div>
            <div className={style.tab_line}>
                <div className={style.tab_icon}></div>
                <p className={("title1", style.tab_title)}>{tabs_status[params.status][1]}</p>
                <div className={style.tab_icon}>
                    <ArchiveButton enable={tabs_status[params?.status][0] > 3} onArchive={params.onArchive}  />
                </div>

            </div>
        </div>
    )
}

const Info = function () {
    return (
        <div>
            <div className={style.row}>
                <TitleText title="produto" text="text" />
                <TitleText title="Destino" text="São Paulo, SP" />
            </div>
            <div className={style.row}>
                <TitleText title="Destinatario" text="Rua pedro I, 255 centro" />
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
    var divStyle = {
        order: tabs_status[params.packageData.status][0]
    };
    
    return (
        <div style={divStyle} className={[style.card, style[`order_${tabs_status[params.packageData.status][0]}`]].join(" ")} >
            <Tabs status={params.packageData.status} onArchive={params.onArchive}/>
            <Info />
            <ButtonBar onClick={()=>params.onDetails(params.packageData)} />
        </div>
    )
}