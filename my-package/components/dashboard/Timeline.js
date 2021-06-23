import style from './Timeline.module.scss'
import TitleText from '../TitleText'

export default function Timeline(params) {

    if(!params?.trackingData?.length) return null

    const listItems = params.trackingData.map((number) =>
        <li key={number.toString()} className={style.listItem}>
            <span key={number.toString()} className={style.dot} />
            <TitleText title={number.data} key={number.toString()} text={number.status} />

        </li>
    );

    return (
        <div className={style.container}>
            <div className={style.line}></div>
            <ul className={style.list}>{listItems}</ul>
        </div>)
}