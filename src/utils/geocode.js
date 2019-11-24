const request = require('request')


const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const geocodingKey = 'pk.eyJ1Ijoia2lyc3Rlbmxpc2EiLCJhIjoiY2szNWxuMDhnMGFwazNubzg4eGt0emp2dSJ9.MG99JHv8hi3JC1sXb0cJng'


const geocode = (address, callback) => {
    const reqUrl = geocodingUrl + encodeURIComponent(address) + '.json?access_token=' + geocodingKey;

    request({ url: reqUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode