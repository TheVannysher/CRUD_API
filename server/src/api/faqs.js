const express = require('express')
const monk = require('monk')
const joi = require('@hapi/joi')

const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs');

const router = express.Router();

const schema = joi.object(
    {
        username : joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        question : joi.string().trim().required(),

        answer : joi.string().trim().required(),
        
        time : joi.date()
        
    }
);

//read all
router.get('/',async (req,res,next) => {
    try {
        const items = await faqs.find({});
        res.json(items);
    } catch (error) {
        next(error);
    }
});

//read one
router.get('/:id',(req,res,next) => {
    res.json({
        message : 'read one'
    });
})
//create one
router.post('/',(req,res,next) => {
    res.json({
        message : 'create one'
    });
})
//update one
router.put('/:id',(req,res,next) => {
    res.json({
        message : 'update one'
    });
})
//delete one
router.delete('/:id',(req,res,next) => {
    res.json({
        message : 'delete one'
    });
})


module.exports = router;