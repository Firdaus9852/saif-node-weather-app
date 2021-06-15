 const request = require('request')
 const geocode = (address, callback) => {
 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?proximity=24.8174934,84.6400070&access_token=pk.eyJ1IjoiZGhvbmk3NjMxIiwiYSI6ImNrbmc0cHpoNzBuZHkydW53bGcyYTkwbTIifQ.j5PqCZ9nINEW8LSUmeaGlQ'
request({ url, json: true }, (error, {body}) => {
    if (error) {
        callback('Unable to connect location services', undefined)
    } else if (body.features.length === 0) {
        callback('Unable to find location,Try again', undefined)
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
