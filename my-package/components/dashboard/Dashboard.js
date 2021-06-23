import style from './Dashboard.module.scss'
import Card from './Card'
import MenuBar from './MenuBar'
import CardsData from './Data-exemple'
import { useState } from 'react'

export default function Dashboard({ ...params }) {
    
    const [cards, setCards] = useState(CardsData);
    const [count, setCount] = useState(0);

    //setCards(CardsData)

    const ListCards = cards.map((CardData,i) => {
        return(<Card packageData={CardData} onArchive={()=>setCards(cards.filter( card => card != CardData))} onDetails={()=>setCount(CardData)} key={CardData} />)
    })

    return (
        <div className={style.container}>
            <div className={[style.grid, (count != 0)? style.autoDisplay: null].join(' ')} >{ListCards}</div>
            <MenuBar package={count} close={()=>setCount(0)}/>
        </div>
    )
}