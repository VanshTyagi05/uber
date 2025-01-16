const mongoose = require('mongoose');

function connectdb() {
    console.log('Attempting to connect to:', process.env.DB_CONNECT);
    mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => {
            const currentTime = new Date().toLocaleString(); // Get current date and time as a string
            console.log(`Database connected successfully at ${currentTime}`);
        })
        .catch((error) => {
            console.error('Database connection error:', error.message);
            process.exit(1); // Exit the process with failure
        });
}

module.exports = connectdb;
