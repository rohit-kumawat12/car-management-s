const express = require('express');
const router = express.Router();
const Car = require('../models/Cars'); // Import the Car model
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Fetch all cars of the logged-in user
router.get('/fetchallcars', fetchuser, async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.user.id }).select('-userId');
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a new car
router.post('/addcar', fetchuser, [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('tags.car_type', 'Car type is required').notEmpty(),
    body('tags.company', 'Company is required').notEmpty(),
    body('tags.dealer', 'Dealer is required').notEmpty(),
    body('images', 'At least one image is required').isArray({ min: 1 })
], async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    try {
        const { title, description, tags, images } = req.body;

        const car = new Car({
            title,
            description,
            tags,
            images,
            userId: req.user.id
        });

        const savedCar = await car.save();
        res.json({ savedCar });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// Update a car
router.put('/updatecar/:id', fetchuser, [
    body('title', 'Title is required').optional().notEmpty(),
    body('description', 'Description is required').optional().notEmpty(),
    body('tags.car_type', 'Car type is required').optional().notEmpty(),
    body('tags.company', 'Company is required').optional().notEmpty(),
    body('tags.dealer', 'Dealer is required').optional().notEmpty(),
    body('images', 'Images should be an array').optional().isArray({ max: 10 })
], async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    try {
        const { title, description, tags, images } = req.body;

        const updatedCar = {};
        if (title) updatedCar.title = title;
        if (description) updatedCar.description = description;
        if (tags) updatedCar.tags = tags;
        if (images) updatedCar.images = images;

        let car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).send("Car not found");
        }

        if (car.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        car = await Car.findByIdAndUpdate(req.params.id, { $set: updatedCar }, { new: true });
        res.json({ car });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// Delete a car
router.delete('/deletecar/:id', fetchuser, async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).send("Car not found");
        }

        if (car.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        car = await Car.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Car has been deleted", car });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;