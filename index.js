const express = require('express')
const  MongoClient  = require('mongodb').MongoClient;
const cors=require('cors')
const app = express()
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.skhdz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json())
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const appointmentCollection = client.db("doctorsProtalBd").collection("appointments");
    const serviceCollection = client.db("doctorsProtalBd").collection("allServices");
    console.log("DATABASE Connected 100%");

    app.post("/addService",(req,res) => {
      const service=req.body;
      console.log(service);
      serviceCollection.insertOne(service)
      .then(result=>{
          console.log(result);
          res.send(result.acknowledged);       
      })
    })
   
    app.get('/services', (req, res) => {
      serviceCollection.find({})
          .toArray((err, documents) => {
              res.send(documents);
          })
     })

     app.post("/servicesByDate",(req,res) => {
      const date=req.body;
      console.log(date.date);
      serviceCollection.find({date:date.date})
      .toArray((err,docs)=>{
        res.send(docs);
      })      
    })



    app.post("/addAppointment",(req,res) => {
      const appointment=req.body;
      console.log(appointment);
      appointmentCollection.insertOne(appointment)
      .then(result=>{
          console.log(result);
          res.send(result.acknowledged);       
      })
    })

   


    app.post("/appointmentsByDate",(req,res) => {
      const date=req.body;
      console.log(date.date);
      appointmentCollection.find({date:date.date})
      .toArray((err,docs)=>{
        res.send(docs);
      })      
    })

    app.get('/appointments', (req, res) => {
      appointmentCollection.find({})
          .toArray((err, documents) => {
              res.send(documents);
          })
     })


 });



const port = 5000



app.get('/', (req, res) => {
    res.send('Welcome to Our server !')
  })


app.listen(process.env.PORT || port)