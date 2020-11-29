const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
const dbRoutes = require('./routers');

dbRoutes(app);





app.set('port',process.env.PORT || 5000) ;

app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));
