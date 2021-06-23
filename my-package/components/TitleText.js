import style from './TitleText.module.scss'
const TitleText = function (props) {
    if(!props.text) return null
    return (
        <div className={`${style.TitleText} ${style.colunm}`}>
            <p className={style.title}>{props.title}:</p>
            <p className={style.text}>{props.text}</p>
        </div>
    )
}

export default TitleText