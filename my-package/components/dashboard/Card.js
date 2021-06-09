import Link from 'next/link'
import style from './Card.module.scss'
import theme from '../theme'
import { BsArrowRightShort } from 'react-icons/bs'
import { ArchiveButton } from '../button/ButtonArchive'


const tabs_status = {
    "created": [0, "em produção"],
    "posted": [1, "postado"],
    "in_transit": [2, "em transito"],
    "being_delivered": [3, "saindo para entrega"],
    "delivered": [4, "entregue"],
    "archived": [5, "entregue"]
}



const Tabs = function (params) {
    const colors = [theme.light, theme.primary, theme.dark]


    function status(num) {
        let state = tabs_status[params?.status][0] - num

        state = state > 2 ? 2 : state
        state = state < 0 ? 0 : state

        return (tabs_status[params?.status][0]) ? colors[state] : colors[1]
    }




    return (
        <div>
            <div className={style.tab_line}>
                <div style={{ "backgroundColor": status(0) }} className={[style?.tab, style.first_child_tab].join(" ")}></div>
                <div style={{ "backgroundColor": status(1) }} className={[style?.tab].join(" ")}></div>
                <div style={{ "backgroundColor": status(2) }} className={[style?.tab, style.last_child_tab].join(" ")}></div>
            </div>
            <div className={style.tab_line}>
                <div className={style.tab_icon}></div>
                <p className={("title1", style.tab_title)}>{tabs_status[params.status][1]}</p>
                <div className={style.tab_icon}>
                    <ArchiveButton enable={tabs_status[params?.status][0] > 3} />
                </div>

            </div>
        </div>
    )
}

const Title_text = function (props) {
    return (
        <div className={`${style.title_text} ${style.colunm}`}>
            <p className={style.title}>{props.title}:</p>
            <p className={style.text}>{props.text}</p>
        </div>
    )
}

const Info = function () {
    return (
        <div>
            <div className={style.row}>
                <Title_text title="produto" text="text" />
                <Title_text title="Destino" text="São Paulo, SP" />
            </div>
            <div className={style.row}>
                <Title_text title="Destinatario" text="Rua pedro I, 255 centro" />
            </div>
        </div>
    )
}


const ButtonBar = function () {
    return (
        <div className={style.bar}>
            <div className={style.bar_icon}></div>
            <div>
                <p className={style.bar_text}>Ver mais</p>
            </div>
            <div className={style.bar_icon}><BsArrowRightShort size="100%" /></div>
        </div>
    )
}


export default function Card({ ...params }) {
    var divStyle = {
        order: tabs_status[params.packageData.status][0]
    };

    return (
        <div style={divStyle} className={[style.card, style[`order_${tabs_status[params.packageData.status][0]}`]].join(" ")} >
            <Tabs status={params.packageData.status} />
            <Info />
            <ButtonBar />
        </div>
    )
}