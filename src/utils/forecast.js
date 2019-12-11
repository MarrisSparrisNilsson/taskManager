const request = require('request');

const forecast = (lat, long, location, callback) => {
    
    const url = `https://api.darksky.net/forecast/21b9aa30b5508932b1b637ef7756ea9c/${lat},${long}?units=si&lang=sv`;

    request({ url, json: true }, (error, { body }) => {
        // console.log(response.body.currently);
        // console.log(error);
        if (error) {
            // console.log('Unable to connect to weather service!');
            callback('Unable to connect to weather service!', undefined)
        } 
        else if (body.error) {
            // console.log('Unable to find location!');
            callback('Unable to find location!', undefined)
            
        }
        else {
            // console.log('It is currently ' + response.body.currently.temperature + ' degrees celcius outside. There is a ' + response.body.currently.precipProbability + '% chanse of rain today');
            // console.log(response.body.daily.data[0].summary);

            callback(undefined, {
                summary: body.daily.data[0].summary,
                currentWeather: `Det är för tillfället ${body.currently.temperature} grader celcius i ${location}. Det är ${body.currently.precipProbability} % chans på regn idag.`,
            })
        }    
    });
}

module.exports = forecast;