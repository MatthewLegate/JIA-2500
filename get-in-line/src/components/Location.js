import axios from 'axios';

const findUserCoordinates = () => {
    document.getElementById('coordinates').innerHTML = "loading...";

    const status = document.querySelector('.status');

    const success = (position) => {
        console.log(position);
        var coordinates = "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude;
        document.getElementById('coordinates').innerHTML = coordinates;
    }

    const error = () => {
        status.textContent = 'Unable to retrieve user location';
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

// const calculateDistance = (originLocation, desinationLocation) => {
//     axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=AIzaSyC6YEaZuMUMNF4pn0n6eONYrR7Vi0nqX4A')
    
//     const locationData = {
//         origins: encodeURI(originLocation),
//         destinations: sanitizeLatitudeAndLongitudeString(destinationLocation),
//         units: 'imperial',
//         key:'AIzaSyC6YEaZuMUMNF4pn0n6eONYrR7Vi0nqX4A'
//     }

//     axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?', {
//         params: locationData
//     })
//     .then(res => {
//         console.log(res.rows)
//     }).catch(err => {
//         console.log(err)
//     });

// }

const calculateDistance = (originLocation, destinationLocation) => {
    originLocation = encodeURI(originLocation);
    destinationLocation = sanitizeLatitudeAndLongitudeString(destinationLocation);
    document.getElementById('distanceFromUser').innerHTML = "Distance from you: loading...";
    fetch(`http://localhost:4000/calculate-distance?origins=${originLocation}&destinations=${destinationLocation}`)
        .catch(err => console.error(err))
        .then(response => updateDistance(response.url));

}

const updateDistance = (responseUrl) => {
    axios.get(responseUrl)
    .then(res => {
        var distance = res.data.rows[0].elements[0].distance.text;
        document.getElementById('distanceFromUser').innerHTML = "Distance from you: " + distance;
    }).catch(err => {
        console.log(err)
    });
}

const encodeURI = (input) => {
    input = input.replaceAll(',', '');
    return input.replaceAll(' ', '%20');
}

const sanitizeLatitudeAndLongitudeString = (input) => {
    input = input.replace('Latitude: ', '');
    return input.replace(' Longitude: ','');
}

function callback(response, status) {
    // See Parsing the Results for
    // the basics of a callback function.
  }

export{
    findUserCoordinates,
    calculateDistance
};