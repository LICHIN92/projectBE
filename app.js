import express from 'express'
import 'dotenv/config'


const port=process.env.port
console.log(port);
const  app=express()

app.listen(port,()=>{
    console.log(`running at :${port}`);
})