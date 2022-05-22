import style from './Timeline.module.scss'
import TitleText from '../TitleText'

export default function Timeline(params) {

    if (!params?.trackingData?.length) return null

    const listItems = params.trackingData.map((number, i) =>
        <li key={i} className={style.listItem}>
            <span className={style.dot} />
            <TitleText title={number.data} text={number.status} />

        </li>
    );

    return (
        <div className={style.container}>
            <div className={style.line}></div>
            <ul className={style.list}>{listItems}</ul>
        </div>
    )
}
