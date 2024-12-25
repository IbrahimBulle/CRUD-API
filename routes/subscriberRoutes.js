const express=require('express')
const router=express.Router()
const Subscriber=require('../modal/subscriber')
const verification=require('../utils/verification')
const subscriber = require('../modal/subscriber')

// getting all
router.get('/', async (req,res)=>{
    try {
        const subscribers=await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message:error.message})//error on server
    }
})
// getting one
router.get('/:id', getSubscriber, (req,res)=>{
    res.json(res.subscriber)
})
// creating one
router.post('/', async (req,res)=>{

   const data=verification(req.body)
   if(data.length>0){
    res.json(data)
   }else{

    try {
        const subscriber=new Subscriber({
            name:req.body.name,
            subscribedToChannel:req.body.subscribedToChannel,
            subscribedDate:req.body.subscribedDate
        })
       const newSubscriber=await subscriber.save();
       res.status(201).json(newSubscriber)
    } catch (error) {
       res.status(404).json({message:error.message})
    }
}
})
// updating one
router.patch('/:id', getSubscriber,async(req,res)=>{
    if(req.body.name!==null){
        res.subscriber.name=req.body.name
    }
    if(req.body.subscribedToChannel!==null){
        res.subscriber.subscribedToChannel=req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber=await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json(error.message)
    }
})  
// deleting one
router.delete('/:id',getSubscriber, async (req,res)=>{
    try {
        await res.subscriber.deleteOne()
        res.json({message:`successfully removed subscriber ${req.params.id}`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//middleware
async function getSubscriber(req,res,next){
    let subscriber
    try {
       subscriber= await Subscriber.findById(req.params.id)
        if(subscriber=== null){
            return res.status(404).json({message:'cannot find subscriber '})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.subscriber=subscriber
    next()
}
module.exports=router