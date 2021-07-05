import style from './TitleText.module.scss'
import { useGlobalContext } from '@/context/global'

export default function TitleText(props) {

    if (!props.text) return null

    const globalContext = useGlobalContext()

    const theme = {
        color: globalContext.themes[globalContext.theme].text
    }

    return (
        <div style={theme} className={`${style.TitleText} ${style.column}`}>
            <p className={style.title}>{props.title}:</p>
            <p className={style.text}>{props.text}</p>
        </div>
    )
}