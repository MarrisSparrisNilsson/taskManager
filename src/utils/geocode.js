const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFydGlubmlsIiwiYSI6ImNrM3B1OXBvNzA2aGIzbm1vemJlMXc4bGsifQ.8solnIuIabSi4k796TisMA&limit=1`;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find a matching location!', undefined)
        } 
        else {
            // console.log('Du lyckades');
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name,
            })            
        }
    })
}

module.exports = geoCode;

