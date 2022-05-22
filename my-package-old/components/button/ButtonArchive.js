import theme from '../theme'
import { MdArchive } from 'react-icons/md'
import style from './ButtonArchive.module.scss'

const ArchiveButton = function (params) {

    const enable = params.enable || false;
    const color = params.color || theme.light;
    const size = params.size || "100%";

    if (enable) {
        return (
            <button onClick={params.onArchive} className={style.button}>
                <MdArchive size={size} color={color} />
            </button>
        )
    } else {
        return (null)
    }
}

export { ArchiveButton }