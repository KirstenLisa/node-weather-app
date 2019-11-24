const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Deine Mudda'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Deine Mudda'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Oops, something went wrong',
        title: 'Help Page',
        name: 'Deine Mudda'
    })
})

app.get('/weather', (req, res) => {
    city = req.query.address
    if(!city) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(city, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: city
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Help',
        errorMessage: 'Help article not found',
        name: 'Chip and Chap'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'another name'
    })
})

// is passed with index.html in public folder
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})