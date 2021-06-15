 const request = require('request')
 const forcast = (latitude,longitude,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=08b1b7c3a4daccc1c21dd86e2dc57797&query='+ latitude +','+ longitude +''
    request({url,json: true},(error,{body}) =>{
        if(error){
            callback('Unable to find weather services',undefined)
            
            }else if(body.error){
            callback("Unable to find location",undefined)
            
            }else{
                callback(undefined,body.current.weather_descriptions[0] +' it is currently ' +body.current.temperature+ ' degree out. It feels like '+ body.current.feelslike +' degree out .It has '+ body.current.precip +' % chance of rain . The humidity is '+ body.current.humidity)
            }
            })
    }
    module.exports =forcast