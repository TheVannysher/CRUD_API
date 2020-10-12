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
router.get('/:id', async (req,res,next) => {
    try {
        const {id} = req.params;
        const item = await faqs.findOne({
            _id: id
        })
        if(!item){
            next();
        }
        return res.json(item);
    } catch (error) {
        next(error)
    }
})
//create one
router.post('/', async (req,res,next) => {
    try {
        console.log(req.body)
        const value = await schema.validateAsync(req.body)
        // res.json(value)
        //TODO : validations 
        const inserted = await faqs.insert(value);
        res.json(inserted)
    } catch (error) {
        next(error)
    }
})
//update one
router.put('/:id',async(req,res,next) => {
    try {
        const {id} = req.params;
        const value = await schema.validateAsync(req.body)
        const item = await faqs.findOne({
            _id: id
        })
        if(!item){
            next();
        }
        // res.json(value)
        //TODO : validations 
        await faqs.update({
            _id : id
        },{
            $set : value,
        });
        res.json(value)
    } catch (error) {
        next(error)
    }
})
//delete one
router.delete('/:id', async (req,res,next) => {
    try {
        const {id} = req.params;
        const item = await faqs.findOne({
            _id: id
        })
        if(!item){
            next();
        }
        await faqs.remove({_id : id})
        res.json({
            message : "success"
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router;