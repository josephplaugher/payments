const ValRules = [
    {   mode: 'development'
    },
    {   log:{
            dev: function(data) { console.log(data)},
            prod: function(data) { console.log(data)}
            }
    },
    {
        name: 'fname',
        required: true,
        alphanumeric: 'true',
        errorMsg: 'Your name is required'
    },
    {
        name: 'date',
        required: false,
        alphanumeric: true,
        errorMsg: 'Please provide a date'
    },
    {
        name: 'ledgerdate',
        alphanumeric: true,
        errorMsg: 'Please enter valid date'
    },
    {
        name: 'invnum',
        alphanumeric: true,
    }
]

export default ValRules;