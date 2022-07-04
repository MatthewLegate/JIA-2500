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

export{
    findUserCoordinates
};