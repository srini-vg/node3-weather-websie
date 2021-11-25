const request = require('request')

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
            callback(undefined, `Temperature is ${data.temperature} degrees out. It feels like ${data.feelslike} out, Looks like ${data.weather_descriptions[0]}, Humidity is ${data.humidity}, And visibility is ${data.visibility}`)
        }
    })
}

module.exports = forecast

