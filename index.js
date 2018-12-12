require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`API server started on ${port}`));

// Database connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
