const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio');
var axios = require('axios');

const app = express(); //alias


//twilio requirements -- change these to your account SID/token
const accountSid = 'ACb8365cc26d37909576524d979324fa1d';
const authToken = '78e7c8080797af17586e4517764a48f4'; 
var client = new twilio(accountSid, authToken);

app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server 
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

//Twilio 
app.get('/send-text', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server')

    //_GET Variables
    const { recipient, textmessage } = req.query;


    //Send Text
    client.messages.create({
        body: textmessage,
        to: recipient,  // Text this number
        from: '+12077421947' // From a valid Twilio number
    }).then((message) => console.log(message.body));
})

//Google Maps API
app.get('/calculate-distance', (req, res) => {
    const { origins, destinations } = req.query;

    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&units=imperial&key=AIzaSyC6YEaZuMUMNF4pn0n6eONYrR7Vi0nqX4A`,
        headers: { }
    };
      
    axios(config)
    .then(function (response) {
        console.log("destinations: " + destinations);
        console.log(JSON.stringify(response.data));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

})

app.listen(4000, () => console.log("Running on Port 4000"))