const express = require('express');
const monk = require('monk');

const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs');

const router = express.Router();

// read all
router.get('/', async (req,res,next) => {
    try {
        const items = await faqs.find({});
        res.json(items);
    } catch (error) {
        next(error);
    }
});
// read one
router.get('/:id', (req,res,next) => {
    res.json({
        message: 'Read One',
    });
});
// create one
router.post('/', (req,res,next) => {
    res.json({
        message: 'Create One',
    });
});
// update one
router.put('/:id', (req,res,next) => {
    res.json({
        message: 'Update One',
    });
});
// delete one
router.delete('/:id', (req,res,next) => {
    res.json({
        message: 'Delete One',
    });
});

module.exports = router;