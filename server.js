const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const bodyParser = require('body-parser')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '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');


//configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(redirectToHTTPS([/localhost:(\d{4})/],[]))


app.post('/booking-mail', (req, res) => {
    const data = req.body
    sendMail(data)
    res.send(data)
})

app.use(express.static('public'))

app.listen(port, function () {
    console.log('server is listening on port: ' + port)
})

function sendMail(data) {
    const msg = {
        to: 'uskovicluka@gmail.com',
        from: 'booking@zadarsailing.com',
        subject: 'Booking Request',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
        sgMail.send(msg).then(resolve).catch(reject)
}
