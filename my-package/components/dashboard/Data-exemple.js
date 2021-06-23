const Data = [
    {
        ID: "0000",
        status: "created",
        shippingCompany: "correios",
        trackingCode: "AA000000001BR",
        shippingType: "sedex 10",
        trackingData: []
    },
    {
        ID: "0000",
        status: "posted",
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
        ID: "0000",
        status: "in_transit",
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
        ID: "0000",
        status: "being_delivered",
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
        ID: "0000",
        status: "delivered",
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
        ID: "0000",
        status: "archived",
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