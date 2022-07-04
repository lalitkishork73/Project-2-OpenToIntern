const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(upload.any());

mongoose
    .connect(
        "mongodb+srv://Krupa0521:JxGJp13b9ifxQZxP@cluster0.sshcjwm.mongodb.net/Group32Database?retryWrites=true&w=majority", {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));

app.use('/', route);

app.listen(process.env.PORT || 3001, function() {
    console.log("Express app running on port " + (process.env.PORT || 3001));
});