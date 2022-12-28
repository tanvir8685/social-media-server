const express = require('express');
const cors = require('cors');
const app =express ();
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT|| 5000;

app.use(cors());
app.use(express.json());


console.log(process.env.DB_User)


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.ij3fmcd.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run (){
    try{
        const statusCollection=client.db('socialMedia').collection('status');
        app.get('/allstatus', async (req, res) => {
            const query = {};
            const allstatus = await statusCollection.find(query).toArray();
            res.send(allstatus)
        });
        app.post('/allstatus',async(req,res)=>{
            const allstatus=req.body;
            const result=await statusCollection.insertOne(allstatus);
            res.send(result);

        })

    }
    finally{

    }

}
run().catch(err=>console.error(err))




app.get('/',(req,res)=>{
    res.send('its working')
})
app.listen(port,()=>{
    console.log(`running on ${port}`)
})