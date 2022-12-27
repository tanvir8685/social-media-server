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
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




app.get('/',(req,res)=>{
    res.send('its working')
})
app.listen(port,()=>{
    console.log(`running on ${port}`)
})