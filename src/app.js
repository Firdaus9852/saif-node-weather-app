const path = require('path')
const express = require('express')
const geocode =require('./utils/geocode')
const forcast = require('./utils/forcast')
const hbs = require('hbs')
const app = express()
const port=process.env.PORT||3000

//Define path for Express config

const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlers
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicPathDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Saif'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Saif alam'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Md Saif Alam'

    })
})
app.get('/product',(req, res)=>{
    console.log(req.query)
    res.send({
        product: []
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude,location} ={} )=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude, (error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
    })
 
    // res.send({
        // location: 'Rafiganj',
        // forcast: 'Sunny its 38 degree out,ist feelslike 37 degree,and 0 % of rain'
    // })

  })
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Md Saif Alam',
        errorMessage:'Help article not found !'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title :'404',
        name:'Md Saif Alam',
        errorMessage:'Page not found!'

    })
})

app.listen(port, () => {
    console.log('server is running on port '+ port)
})