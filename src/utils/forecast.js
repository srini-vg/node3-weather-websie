const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude, lattitude, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=8513a2b6e0d1d929230c91397d90c9a8&query=${lattitude}, ${longitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const data = body.current
            callback(undefined, `It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} out, Looks like ${data.weather_descriptions[0]}`)
        }
    })
}

module.exports = forecast

