const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'basedatos')));

const dbRoutes = require('./routers');

dbRoutes(app);



app.get('/envia', (req, res) => {
    res.send('Hola Mundo!');
  });
  
  app.post('/guardar', (req, res) => {
    console.log('HOLA')
    console.log(req.body);
    res.json({ 'res': 'guarda' })
  
  
  });

app.set('port',process.env.PORT || 5000) ;

app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));
