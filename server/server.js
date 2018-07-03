require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Bundler = require('parcel-bundler');
const PORT = Number(process.env.PORT);

let app = express();

app.use(bodyParser.json());
app.get('/status',(req, res) => {
    return res.json({message: "ok"});
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/api/send', (req, res) => {
    console.log('Received a request to send to ', req.body.receiver, ' the message ', req.body.message);
    let SID = process.env.TWILIO_SID;
    let TOKEN = process.env.TWILIO_TOKEN;
    let SENDER = process.env.TWILIO_SENDER;

    if (!SID || !TOKEN) {
        return res.json({message: 'add TWILIO_SID and TWILIO_TOKEN to .env file.'})
    }

    let client = require('twilio')(SID, TOKEN);

    client.messages
        .create({
            body: req.body.message,
            from: SENDER,
            to: req.body.receiver,
        })
        .then(() => {
            console.log('Sent request to Twilio successfully')
        })
        .done();
});

app.listen(PORT);
