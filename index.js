const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;
const urlRoutes = require('./controllers/Url/Routes');

const allowedSites = [
    'http://localhost:4200',
];

const corsOptions = {
    credentials: true,
    origin: allowedSites
};

// for url routes
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/v1/url', urlRoutes);

app.listen(port, ()=>{ console.log(`listening on the port: http://localhost:${port}`); });

module.exports = app;