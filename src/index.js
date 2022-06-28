const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/routes.js')
const mongoose = require('mongoose')
const app = express();

app.use(bodyParser.json());

mongoose
    .connect("mongodb+srv://Deepak:Deepak9162@cluster0.uylkg.mongodb.net/Group32Database?retryWrites=true&w=majority", {
             useNewUrlParser : true
    })

    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use(' / ', router)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});