require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const apiRoute = require('./routes/api.route');

//connect to DB
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
	() => console.log('Connected to DB')
);

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('API Server'));
app.use('/static', express.static('public'));
app.use('/api', apiRoute);

app.listen(port, () => console.log('Server is running!'));
