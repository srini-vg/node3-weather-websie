const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
//Setup static directory to serve
const pulicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.use(express.static(pulicDirectoryPath))

//Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Srinivas Gurram'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Srinivas Gurram'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a weather app, Which is used to show the Forecast of weather by location',
        name: 'Srinivas Gurram'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address;
    console.log(address)
    if (!address) {
        return res.send({
            error: 'address must be provided'
        })
    }
    else {
        geocode(address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address
                })
            })
        })
    }

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Srinivas Gurram',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        name: 'Srinivas Gurram',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on 3000 ')
})