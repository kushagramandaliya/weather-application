const request = require('postman-request')

const forecast = (lati , long , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=07c3acad370733d481cf55bb6976ae19&query='+ lati + ',' + long+ ''

    request({ url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect service', undefined)
        }
        else if(response.body.error){
            callback('Try another search', undefined)
        }
        else{
            callback(undefined ,  'There is currently '  +response.body.current.temperature+  ' degrees out and weather is like ' +response.body.current.weather_descriptions)
        }
    })
}

module.exports = forecast