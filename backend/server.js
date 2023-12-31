const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Tabela = require('./model/TaskTabela')
require('dotenv').config()


const app = express()

const allowedOrigin = 'https://todays-tasks-node.vercel.app'

app.use(express.json())
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

try{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //iU1YyzNlgfxqsxJW
    })
    console.log('MongoDb has started...')
}
catch(err){
    console.log(err)
}

app.get('/getTasks', async (req, res) => {
    try {
        const data = await Tabela.find({})
        res.status(200).json(data)
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal server error' }); // Return a 500 status code for server errors
    }
})


app.post('/postTasks',async(req,res)=>{
    const {task} = req.body;
try{
    const table = await Tabela.create({
        task:task
    })

    res.status(200).json(table)
} catch(err){
     res.status(404).json(err)
}
})

app.delete('/deleteTask/:id',async(req,res)=>{
    const id = req.params.id
try{
    const newData = await Tabela.findByIdAndRemove(id)
    res.json(newData)
}catch(err){
    res.json(err)
}
   
})


const port = process.env.PORT

app.listen(port,()=>{
    console.log('Server has started...')
})
