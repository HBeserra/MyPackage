import style from './Dashboard.module.scss'
import Card from './Card'
import MenuBar from './MenuBar'
export default function Dashboard({ ...params }) {
    const DataExemple1 = {
        status: "created",
        shipping_company: "correios",
        local: 'CDD ITAGUAI - Itaguai / RJ'
    }
    const DataExemple2 = {
        status: "posted",
        shipping_company: "correios",
        local: 'CDD ITAGUAI - Itaguai / RJ'
    }
    const DataExemple3 = {
        status: "in_transit",
        shipping_company: "correios",
        local: 'CDD ITAGUAI - Itaguai / RJ'
    }
    const DataExemple4 = {
        status: "being_delivered",
        shipping_company: "correios",
        local: 'CDD ITAGUAI - Itaguai / RJ'
    }
    const DataExemple5 = {
        status: "archived",
        shipping_company: "correios",
        local: 'CDD ITAGUAI - Itaguai / RJ'
    }

    return (
        <div className={style.container}>
            <div className={style.grid}>
                <Card packageData={DataExemple1} />
                <Card packageData={DataExemple1} />
                <Card packageData={DataExemple2} />
                <Card packageData={DataExemple3} />
                <Card packageData={DataExemple4} />
                <Card packageData={DataExemple5} />

            </div>
            <MenuBar/>
        </div>
    )
}