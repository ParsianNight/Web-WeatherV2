const request = require("request")
const apiKey = "875a5d95571c4c65a9b135704221407"
const geocode = (address, callback) => {

    const options = {
    method: 'GET',
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoidG9teXhyYXQiLCJhIjoiY2tya3ZqZGh1MTY4dzJvcGUzZzZxaDZ5aSJ9.4fnwO01VG9WBdbZRHYnjCQ&limit=1',
    json: true
} 
    request(options, (erorr,{body}) => {
        if (erorr) {
            return  callback('unable to connect to the server!', {})
        } else if (body.message === "Not Authorized - Invalid Token") {
           return  callback('please put an authorized api', {})
       } else if  (body.features[0] === undefined) {
     //   const placeName = body.features[0].place_name;
    
       //  const latitude = 0
         //cconst longtude = 0
         return callback('please put an authorized api', {})

        } else {
        callback(undefined,{
            longtude: body.features[0].geometry.coordinates[1],
            latitude: body.features[0].geometry.coordinates[0],
            placeName: body.features[0].place_name
        })
        }
    })
}

module.exports = geocode;


