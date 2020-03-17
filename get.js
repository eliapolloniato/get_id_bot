var rp = require('request-promise')
var base_url = 'https://web.spaggiari.eu/rest/'
var auth = {
    method: 'POST',
    uri: base_url + 'v1/auth/login',
    qs: {
        'User-Agent': 'zorro/1.0',
        'Z-Dev-Apikey': '+zorro+',
    },
    json: true
}

const login = (options, debug, callback) => {
    rp({
        method: 'POST',
        uri: base_url + 'v1/auth/login',
        body: {
            'ident': null,
            'pass': options.password,
            'uid': options.username
        },
        headers: {
            'User-Agent': 'zorro/1.0',
            'Z-Dev-Apikey': '+zorro+'
        },
        json: true
    }).catch((err) => {
        callback(null, err)
    }).then(res => {
        if (debug) console.log('Getting token')
        callback(res, null)

    })
}


module.exports = login