import style from './MapImage.module.scss'
import Image from 'next/image'

export function MapImage(params) {
    
    const height = params?.height || 300
    const width = params?.width || 600
    
    
    const lat = params?.lat || -50
    const lon = params?.lon || -20
    const zoom = params?.zoom || 1.5

    const theme = params?.theme || "hbeserra/ckpprd2qu089z17qm3npvqn1l"

    const link = `https://api.mapbox.com/styles/v1/${theme}/static/pin-s+e02041(${lat},${lon})/${lat},${lon},${zoom},0/${width}x${height}?access_token=pk.eyJ1IjoiaGJlc2VycmEiLCJhIjoiY2twcHRqMDU2MDZ6cTJwbGVkeHExZXVkaCJ9.Gg9nUubaGQbxJvUA37lRGQ`

    return (<Image className={style.MapImage} src={link} height={height} width={width} quality="80" />)
}

