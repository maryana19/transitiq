const allAgencies = [
    {id: 'Aa919', name: 'AAATA'},
    {id: 'Ag744', name: 'agency'},
    {id: 'ArTr561', name: 'Arlington Transit'},
    {id: 'CaPa539', name: 'California Parks'},
    {id: 'Oh931', name: 'Central Ohio Transit Authority'},
    {id: 'Oh932', name: 'Central Ohio Transit Authority (old)'},
    {id: 'DcCi', name: 'DC Circulator'},
    {id: 'DcSc', name: 'agenDC Streetcarcy'},
    {id: 'EaTe933', name: 'Eastbanc Technologies'},
    {id: 'ebt', name: 'EastBanc Technologies'},
    {id: 'Fv362', name: 'fvv'},
    {id: 'Ho414', name: 'Houston'},
    {id: 'Ho414Dev', name: 'HoustonDev'},
    {id: 'Ne429', name: 'NewYork'},
    {id: 'NeGe', name: 'NextGen'},
    {id: 'RiOn432', name: 'Ride On'},
]

export default {
    gtfsFiles: [],
    agencies: allAgencies,
    agencyId: '',
    alert: {
        title: '',
        text: '',
        success: true,
        show: false
    },
    user: {
        name: '',
        isAdmin: false,
        agencies: []
    },
    blocking: false,
    token:  JSON.parse(localStorage.getItem('TOKEN'))
}
