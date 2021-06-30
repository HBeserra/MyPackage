const Data = [
    {
        id: "0",
        status: "created",
        location: ['-46','-12'],
        shippingCompany: "correios",
        trackingCode: "AA000000001BR",
        shippingType: "sedex 10",
        trackingData: []
    },
    {
        id: "1",
        status: "posted",
        location: ['-46','-12'],
        shippingCompany: "correios",
        trackingCode: "AA000000002BR",
        shippingType: "sedex",
        trackingData: [
            {
                status: 'Objeto postado',
                data: '14/04/2020',
                hora: '14:28',
                local: 'AGF VILA PREL - Sao Paulo / SP',
            }
        ],
    },
    {
        id: "2",
        status: "in_transit",
        location: ['-46','-12'],
        shippingCompany: "correios",
        trackingCode: "AA000000003BR",
        shippingType: "sedex",
        trackingData: [
            {
                status: 'Objeto postado',
                data: '14/04/2020',
                hora: '14:28',
                local: 'AGF VILA PREL - Sao Paulo / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '09:03',
                origem: 'AGF VILA PREL - Sao Paulo / SP',
                destino: 'CTE CAJAMAR - Cajamar / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '22:18',
                origem: 'CTE CAJAMAR - Cajamar / SP',
                destino: 'CTE BENFICA - Rio De Janeiro / RJ',
            }
        ],
    },
    {
        id: "3",
        status: "being_delivered",
        location: ['-46','-12'],
        shippingCompany: "correios",
        trackingCode: "AA000000004BR",
        shippingType: "pac",
        trackingData: [
            {
                status: 'Objeto postado',
                data: '14/04/2020',
                hora: '14:28',
                local: 'AGF VILA PREL - Sao Paulo / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '09:03',
                origem: 'AGF VILA PREL - Sao Paulo / SP',
                destino: 'CTE CAJAMAR - Cajamar / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '22:18',
                origem: 'CTE CAJAMAR - Cajamar / SP',
                destino: 'CTE BENFICA - Rio De Janeiro / RJ',
            },
            {
                status: 'Objeto encaminhado',
                data: '16/04/2020',
                hora: '10:04',
                origem: 'CTE BENFICA - Rio De Janeiro / RJ',
                destino: 'CDD ITAGUAI - Itaguai / RJ',
            },
            {
                status: 'Objeto saiu para entrega ao destinatário',
                data: '17/04/2020',
                hora: '08:06',
                local: 'CDD ITAGUAI - Itaguai / RJ',
            }
        ],
    },
    {
        id: "4",
        status: "delivered",
        location: ['-46','-12'],
        shippingCompany: "correios",
        trackingCode: "AA000000005BR",
        shippingType: "pac",
        trackingData: [
            {
                status: 'Objeto postado',
                data: '14/04/2020',
                hora: '14:28',
                local: 'AGF VILA PREL - Sao Paulo / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '09:03',
                origem: 'AGF VILA PREL - Sao Paulo / SP',
                destino: 'CTE CAJAMAR - Cajamar / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '22:18',
                origem: 'CTE CAJAMAR - Cajamar / SP',
                destino: 'CTE BENFICA - Rio De Janeiro / RJ',
            },
            {
                status: 'Objeto encaminhado',
                data: '16/04/2020',
                hora: '10:04',
                origem: 'CTE BENFICA - Rio De Janeiro / RJ',
                destino: 'CDD ITAGUAI - Itaguai / RJ',
            },
            {
                status: 'Objeto saiu para entrega ao destinatário',
                data: '17/04/2020',
                hora: '08:06',
                local: 'CDD ITAGUAI - Itaguai / RJ',
            },
            {
                status: 'Objeto entregue ao destinatário',
                data: '17/04/2020',
                hora: '11:12',
                local: 'CDD ITAGUAI - Itaguai / RJ',
            },
        ],
    },
    {
        id: "5",
        status: "archived",
        location: ['-46','-12'],
        shippingCompany: "correios",
        trackingCode: "AA000000006BR",
        shippingType: "pac",
        trackingData: [
            {
                status: 'Objeto postado',
                data: '14/04/2020',
                hora: '14:28',
                local: 'AGF VILA PREL - Sao Paulo / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '09:03',
                origem: 'AGF VILA PREL - Sao Paulo / SP',
                destino: 'CTE CAJAMAR - Cajamar / SP',
            },
            {
                status: 'Objeto encaminhado',
                data: '15/04/2020',
                hora: '22:18',
                origem: 'CTE CAJAMAR - Cajamar / SP',
                destino: 'CTE BENFICA - Rio De Janeiro / RJ',
            },
            {
                status: 'Objeto encaminhado',
                data: '16/04/2020',
                hora: '10:04',
                origem: 'CTE BENFICA - Rio De Janeiro / RJ',
                destino: 'CDD ITAGUAI - Itaguai / RJ',
            },
            {
                status: 'Objeto saiu para entrega ao destinatário',
                data: '17/04/2020',
                hora: '08:06',
                local: 'CDD ITAGUAI - Itaguai / RJ',
            },
            {
                status: 'Objeto entregue ao destinatário',
                data: '17/04/2020',
                hora: '11:12',
                local: 'CDD ITAGUAI - Itaguai / RJ',
            },
        ],
    },
]

export default Data