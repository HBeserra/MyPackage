import style from './MapImage.module.scss'

export function MapImage(params) {

    const height = params?.height || 250
    const width = params?.width || 600

    const lat = params?.location[0] || -50
    const lon = params?.location[1] || -20
    const zoom = params?.zoom || 9

    const theme = params?.theme || "hbeserra/ckpprd2qu089z17qm3npvqn1l"

    const link = `https://api.mapbox.com/styles/v1/${theme}/static/pin-s+e02041(${lat},${lon})/${lat},${lon},${zoom},0/${width}x${height}?access_token=pk.eyJ1IjoiaGJlc2VycmEiLCJhIjoiY2twcHRqMDU2MDZ6cTJwbGVkeHExZXVkaCJ9.Gg9nUubaGQbxJvUA37lRGQ`

    // Carrega a imagem do mapa, utilizando img ao invés de next/Image pois a otimização do next atrapalha no carregamento dinâmico 
    // Não aumenta o tempo de carregamento da pagina, pois a imagem so é carregada com o input do usuário
    return (<img className={style.MapImage} src={link} height={height} width={width} quality="100" />)
}

