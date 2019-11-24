const request = require('request')

const weatherUrl = 'https://api.darksky.net/forecast/26485ae19b0066ab31024b2d7ce39a20/'

const forecast = (lat, long, callback) => {
    const searchUrl = weatherUrl + lat + ',' + long;

    request({url: searchUrl, json: true},
        (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather services.', undefined)
            } else if (body.error) {
                callback('Invalid location. Try another search', undefined)
            } else {
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            }
        })
}

module.exports = forecast

