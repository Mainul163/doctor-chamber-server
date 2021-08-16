const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3o0aj.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
const port=app.listen(process.env.PORT|| 5000)

app.use(cors())
app.use(express.json())



app.get('/', function (req, res) {
    res.send('hello world ')
  })




  
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  const appoinment = client.db("doctor-chamber").collection("bookingInfo");


    app.post('/addAppointment',(req,res)=>{
      const addAppointment=req.body;
      appoinment.insertOne(addAppointment)
      .then(result=>{
        res.send( result.insertedCount >0 )
      })
    })


    app.post('/appoinmentByDate',(req,res)=>{

      const date=req.body;
      appoinment.find({date:date.date})
      .toArray((err,document)=>{
        res.send(document)
      })
    })

    app.get('/allpatients',(req,res)=>{
      appoinment.find()
      .toArray((err,documents)=>{
        res.send(documents)
      })
    })
 
});
  
 app.listen(port)