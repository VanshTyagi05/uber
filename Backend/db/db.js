const mongoose = require('mongoose');

function connectdb() {
    console.log('Attempting to connect to:', process.env.DB_CONNECT);
    mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => console.log('Database connection established'))
        .catch((error) => {
            console.error('Database connection error:', error.message);
            process.exit(1); // Exit the process with failure
        });
}

module.exports = connectdb;
