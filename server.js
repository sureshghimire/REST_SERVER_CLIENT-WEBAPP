require('dotenv')


const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));


const PORT = process.env.PORT   ||  8888 

const collection = require('./db/Story')

app.get('/stories', (req, res)=>{
    const all = collection.all();
    res.json(all);
})

app.post('/stories', (req, res)=>{
    try {
        const body = req.body;

        // below is roughly equal to saying Object.assign(body, { author: req.user.username})
        const data = { ...body };

        const story = collection.add(data);
        
        res.status(201).json(story);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
})



app.listen(PORT, ()=>{console.log(`Server listening to port ${PORT}`)})
