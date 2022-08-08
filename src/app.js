const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app  = express()
const port = process.env.PORT | 3000 
const geoCode = require('./utils/geocode')
const getWeather = require('./utils/getWeather')

// Define paths 
const publicDirectoryPath = path.join(__dirname,"../public")
const viewDirectoryPath = path.join(__dirname,"../templetes/views")
const partialsPath = path.join(__dirname,"../templetes/partials")

// Setup handlebars view and engine 
app.set('view engine','hbs')
app.set('views',viewDirectoryPath);
hbs.registerPartials(partialsPath  )

//Serving static 
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Omar Ahmed'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Page',
        name:'Omar Ahmed'
    })
})

app.get('/products', (req,res) => { 
    if(!req.query.name){
        return  res.send('Please provide an parameter')
    }
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address )
        return  res.send('Please provide an address')


    geoCode(req.query.address, (error,data) => {
        if(error)
        return res.send(error)
        getWeather(data, (error, data = {}) => {
            if(error)
            return req.send(error)
            
            res.send({
                Location: data.body.location.name +", " + data.body.location.region,
                Tempreature: data.body.current.temp_c
            })
        })
         

    })    
    

}
)

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help ',
        name: 'Omar Ahmed'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:"Error 404, Article not found",
        name: 'Omar Ahmed'
    })
    })

app.get('*', (req,res) => {
    res.render('404',{
        title:'Error 404, Page not Found',
        name:'Omar Ahmed'
    })
})

// app.com

app.listen(port,() => {
    

    console.log('Running on port 3000')
})