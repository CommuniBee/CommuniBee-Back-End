require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`API server started on ${port}`));

// Database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:PVVQUGQOAWYOZZIH@portal-ssl359-47.bmix-dal-yp-b709d2f7-d3d3-4bce-9a64-a3e5497e93f5.4290300913.composedb.com:17949,portal-ssl354-45.bmix-dal-yp-b709d2f7-d3d3-4bce-9a64-a3e5497e93f5.4290300913.composedb.com:17949/compose?authSource=admin&ssl=true');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));