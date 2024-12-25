const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const connectDB=async ()=>{
    try {
        mongoose.connect(process.env.db_uri)
        const db=mongoose.connection
        db.once('open',()=>console.log("connected to database"))
    } catch (error) {
        db.on('error',(error) =>console.log({error:error.message}))
    }
}
module.exports=connectDB