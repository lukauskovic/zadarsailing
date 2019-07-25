const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bookingMail = process.env.BOOKING_MAIL
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const bodyParser = require('body-parser')
const sgMail = require('@sendgrid/mail')
const pug = require('pug');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

function sendMail(data){
    const today = new Date();
    const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    const time = today.getHours() + ":" + today.getMinutes()
    const reqDate = new Date(data['date'])
    data['date'] = reqDate.getDate()+'/'+(reqDate.getMonth()+1)+'/'+reqDate.getFullYear()
    const nowDate = date+' '+time;
    if (data.plan === '1') data['plan'] = 'Daily Sailing'
    else if (data.plan === '2') data['plan'] = 'Half Day Sailing'
    else if (data.plan === '3') data['plan'] = 'Sunset Sailing'
    data['nowDate'] = nowDate
    const msg = {
        to: bookingMail,
        from: 'booking@zadarsailing.com',
        subject: 'Booking Request',
        html: pug.renderFile('./booking_mail.pug', data)
    }
    sgMail.send(msg)
}
