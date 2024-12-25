const express =require('express')
const mongodb=require('./db')
const app=express()
app.use(express.json())
const subscribersRoutes=require('./routes/subscriberRoutes')
app.use('/subscribers',subscribersRoutes)

app.listen(4000,()=>console.log("server running"))
mongodb()