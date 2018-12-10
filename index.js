require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`API server started on ${port}`));

// Database connection
var mongoose = require('mongoose');
//mongoose.connect('mongodb://{connection_url}');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
