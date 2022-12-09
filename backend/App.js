let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
mongoose
  .connect('mongodb://127.0.0.1:27017/Project2')
  .then((data) => {
    console.log(`Connected to Mongo! Database name: "${data.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const VeteranRoute = require('./routes/VeteranRoute');
const CommunityRoute = require('./routes/Communityroute');
app.use(cors());
app.use('/VeteranRoute', VeteranRoute);
app.use('/Communityroute', CommunityRoute);

app.listen(5000, function () {
  console.log("connected to the Port 4000");
})
