const express = require('express');
const https = require('https');
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});
app.post('/', (req, res) => {

    const query = req.body.cityname;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=62eac68d7536449177e15d3de284e00b&units=metric`

    // https.get -->is used to get the data from an api
    https.get(url, function(response) {
        response.on('data', function(data) {
            const whetherData = JSON.parse(data);
            const temperature = whetherData.main.temp;
            const whetherdiscription = whetherData.weather[0].description;
            const location = whetherData.name;
            const icon = whetherData.weather[0].icon;
            const imageurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p>The whether description of ${location} currently is ` + whetherdiscription + `</p>`)
            res.write(`<h1>the temperature of ${location} is ` + temperature + ' degrees celcius</h1>')
            res.write(`<img src="${imageurl}" alt="err">`)
            res.send();

        })

    })
})

app.listen(3000, function() {
    console.log('listening the port at 3000');
})