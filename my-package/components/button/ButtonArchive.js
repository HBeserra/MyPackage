import theme from '../theme'
import { MdArchive } from 'react-icons/md'

const ArchiveButton = function (params) {

    const enable = params.enable || false;
    const color = params.color || theme.light;
    const size = params.size || "100%";
    
    if (enable) {
        return (<MdArchive size={size} color={color} />)
    } else {
        return (null)
    }
}

export  { ArchiveButton }