const request = require("request")
const apiKey = "875a5d95571c4c65a9b135704221407"
const getWeather = ({latitude, longtude},callback) => {
    const options = {
        url: "http://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+longtude+","+latitude,
        method: "GET",
        json: true
    }
    request(options,(error,data) => {
        if(error) {
           return callback(error,undefined)
        } else {
           return  callback(undefined,data)
        }
    })
}

module.exports = getWeather
