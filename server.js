require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Bundler = require('parcel-bundler');
const PORT = Number(process.env.PORT);

// let bundler = new Bundler('src/index.tsx');
let app = express();

app.use(bodyParser.json());
app.get('/status',(req, res) => {
    return res.json({message: "ok"});
});

app.post('/api/send', (req, res) => {
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
        .then(message => {
            // tslint:disable-next-line:no-console
            console.log(message.sid)
        })
        .done();
});

// app.use(bundler.middleware());

app.listen(PORT);
