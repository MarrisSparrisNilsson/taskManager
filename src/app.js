const path = require('path')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// const request = require('request')
const express = require('express')
const hbs = require('hbs')

const app = express()

const publicPathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicPathDir))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//app.com/index
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Martin',
    })
})

//app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Martin Nilsson',
    })
})

// app.com/help
app.get('/help', (req, res) => {
    // res.send({
    //     name: 'Andrew',
    //     age: 27,
    // })
    // app.use(express.static(path.join(__dirname, '../public/help.html')))

    res.render('help', {
        title: 'Help page!',
        name: 'halp me (Martin)',
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide an location in order to get weather forecast!',
        })
    }

    geoCode(req.query.location, (error, {lat, long, location} = {}) => {
        // console.log('Data', ;
        
        if (error) {        
            return res.send({
                errorMessage: error,
            })
        }
        
        forecast(lat, long, location, (error, forecastData) => {
            if (error) {
                return res.send({
                    errorMessage: error
                })                
            }
            res.send({
                data: forecastData,
            }) 
        })
    })

    // res.send({
    //     location: `${req.query.location}, Stockholm, Sweden`,
    //     forecast: `In ${req.query.location} it is currently -3 degrees celcius outside`,
    // })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!',
        })
    }    

    console.log(req.query.search);
    // console.log(req.query);
    
    res.send({
        title: 'Some text',
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('page404', {
        title: '404',
        name: 'Martin Nilsson',
        errorM: 'Help article not found',
    })
})


app.get('*', (req, res) => {
    // res.send('My 404 page - Could not find page url')
    res.render('page404', {
        title: '404',
        name: 'Me',
        errorM: 'Could not find your url search',
        // helpText: 'Visit our help page',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})