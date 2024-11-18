const mongoose = require('mongoose');
const password = encodeURIComponent(process.env.MONGOPASS);
const username = process.env.MONGOUSER;

// const mongoURI = `mongodb+srv://${username}:${password}@cluster0.l3zc3wu.mongodb.net/rohitnotehub1?retryWrites=true&w=majority&appName=Cluster0`;
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.bvxsh.mongodb.net/carsudha?retryWrites=true&w=majority&appName=Cluster0`;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectToMongo;