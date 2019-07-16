const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const bodyParser = require('body-parser')


//configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(redirectToHTTPS([/localhost:(\d{4})/],[]))


app.post('/booking-mail', (req, res) => {
    const data = req.body
    doSomethingWithData(data)
    res.send(data)
})

app.use(express.static('public'))

app.listen(port, function () {
    console.log('server is listening on port: ' + port)
})

//todo send mail with booking data
function doSomethingWithData(data) {
    console.log(data)
}