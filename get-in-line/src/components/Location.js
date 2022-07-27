import axios from 'axios';

const findUserCoordinates = () => {
    document.getElementById('coordinates').innerHTML = "loading...";

    const status = document.querySelector('.status');

    const success = (position) => {
        var coordinates = "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude;
        document.getElementById('coordinates').innerHTML = coordinates;
    }

    const error = () => {
        status.textContent = 'Unable to retrieve user location';
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

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

const displayNumberOfPeopleInLine = (numberOfPeopleInLine) => {
    document.getElementById('numberOfPeopleInLine').innerHTML = "Current number of people in line: " + numberOfPeopleInLine;

}

const encodeURI = (input) => {
    input = input.replaceAll(',', '');
    return input.replaceAll(' ', '%20');
}

const sanitizeLatitudeAndLongitudeString = (input) => {
    input = input.replace('Latitude: ', '');
    return input.replace(' Longitude: ','');
}

export{
    findUserCoordinates,
    calculateDistance,
    displayNumberOfPeopleInLine
};