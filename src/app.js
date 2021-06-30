const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname , '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('views' , viewspath)
app.set('view engine' , 'hbs')
hbs.registerPartials(partialpath)

//Setup static directory to server
app.use(express.static(publicpath))

app.get('' , (req , res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Kushagra Mandaliya'
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        title: 'Help page',
        name: 'Kushagra Mandaliya'
    })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kushagra Mandaliya'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(req.query.address, (error , {lati , long , place} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(lati , long , (error, data1) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: data1,
                place,
                address: req.query.address
            })
        })
    })
})

app.get('/products' , (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req ,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Kushagra Mandaliya',
        errormessage: 'Help page article not found'
    })
})

app.get('*', (req ,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Kushagra Mandaliya',
        errormessage: 'Page Not Found'
    })
})

app.listen(port , () => {
    console.log('Server is up on port ' +port)
})