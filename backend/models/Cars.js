const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the car
    description: { type: String, required: true }, // Description of the car
    tags: {
        car_type: { type: String, required: true }, // Type of car (e.g., sedan, SUV)
        company: { type: String, required: true }, // Manufacturer (e.g., Tesla)
        dealer: { type: String, required: true }, // Dealer information
    },
    images: {
        type: [String], // Array of image URLs or paths
        validate: {
            validator: function (images) {
                return images.length <= 10; // Ensure up to 10 images only
            },
            message: 'A car can have up to 10 images only.',
        },
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the car
});

module.exports = mongoose.model('Car', carSchema);