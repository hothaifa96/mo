
const express = require('express')
const {validate,Animal} = require('../Models/animals')
const router = express.Router()
const auth = require('../middlewares/auth')


//GET ALL ANIMALS 
router.get('/',auth,async (req,res)=>{
    const animals = await Animal.find().sort('name').select('name color -_id');
    res.send(animals);
});

// GET BY ID 
router.get('/:id',async (req, res)=>{
    //res.send(`localhost:${port}//${req.params.id}?${'email'}=${req.query['email']}`)
    const animal= await Animal.findById(req.params.id);
    if(!animal)
        res.status(400).send('this id is not valid ')
    res.send(animal)

});

//ADD NEW ANIMAL 
router.post('/',async (req,res)=>{

    const results = validate(req.body)
    if(results.error){
        // bad REQUEST 400
        res.status(400).send(results.error.details[0].message)
        return
    }

    let animal = new Animal({
        name: req.body.name,
        age: req.body.age,
        color: req.body.color,
        flying : req.body.flying
    });
    animal = await animal.save()
    res.send(animal)
});

router.put('/:id',async(req,res)=>{
    // search the animal 
    const {error} = validate(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const animal = await Animal.findByIdAndUpdate(req.params.id,
        {
            $set:{
                name: req.body.name,
                age: req.body.age,
                color: req.body.color,
                flying: req.body.flying,
            }
            , new: true
        })
        
    if(!animal){
        res.status(400).send('this animal does not exist');
        return;
    }
    res.send(animal)
});


//DELETE 
router.delete('/:id',async (req,res)=>{
    const animal= await Animal.findByIdAndRemove(req.params.id);
    if(!animal){
        res.status(400).send('this animal does not exist')
        return;
    }
    res.send(true);
})



module.exports = router ;