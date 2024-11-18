const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// Fetch all notes of loggedin user
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id}).select("-user");
        res.json(notes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// Add new note of loggedin user
router.post('/addnote', fetchuser, [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty()
], async (req, res)=>{

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    try {
        const {title, description, tag} = req.body;

        const note = new Notes({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        });

        const savedNote = await note.save();

        res.json({savedNote});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

// Update a note of loggedin user
router.put('/updatenote/:id', fetchuser, [ 
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty()
], async (req, res)=>{

    const result = validationResult(req);
    console.log(req.params.id);

    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    try {
        const {  title, description, tag} = req.body;

        const newNote = {};

        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        let note = await Notes.findById(req.params.id);

        if(!note){
            return res.status(400).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})


// Delete a note of loggedin user
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try{
        let note = await Notes.findById(req.params.id);

        if(!note){
            return res.status(400).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted", note: note});

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error'); 
    }
})


module.exports = router