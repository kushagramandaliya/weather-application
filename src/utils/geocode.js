const request = require('postman-request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VzaGFncmEwOSIsImEiOiJja3EyNmpsb3kwNmhoMm9vNHlwZDF4ZGl0In0.cR_TIrgBRf3NWy2aSvPblw&limit=1'

    request({ url, json : true}, (error , response) => {
        if(error){
            callback('Unable to connect services', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Try another search', undefined)
        }
        else{
            callback(undefined ,  {
                lati : response.body.features[0].center[1],
                long : response.body.features[0].center[0],
                place : response.body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode