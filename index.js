const express = require("express")
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 4000;
// middlewere
app.use(cors())
app.use(express.json())
// mongodb connection

const uri = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_Password}@cluster0.smw489h.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://:@cluster0.0vygy0s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


function run() {
  try {
    const catagoryCollection = client.db('aryan-tech').collection('catagory')
    const pcPartsCollection = client.db('aryan-tech').collection('pc-parts')

    app.get('/catagory', async (req, res) => {
      const query = {}
      const result = await catagoryCollection.find(query).toArray()
      res.send(result)
    })
    app.get('/catagory/:category', async (req, res) => {
      const category = req.params.category;
      const query = { category: category }
      const result = await pcPartsCollection.find(query).toArray()
      res.send(result)
    })
    app.get('/product', async (req, res) => {
      const query = {}
      const result = await pcPartsCollection.find(query).toArray()
      console.log(result)
      res.send(result)
    })
    app.get('/productDetails/:id', async (req, res) => {
      const id = req.params.id;
      const result = await pcPartsCollection.findOne({ _id: new ObjectId(id) })
      console.log(id, result)
      res.send(result)
    })
    // // user seales  
    // app.get('/deshbord/myorders/:email',async(req,res)=>{
    //     const email = req.params.email;

    //     const query = {email:email}
    //     const cursur = await productCollection.find(query);
    //     const result = await cursur.toArray()
    //     res.send(result);
    //     console.log(result);
    // })

    //         app.get('/userInfoUserData',async(req,res)=>{
    // const role = req.query.role
    //             const query ={}
    //             const result = await usersCollectData.find(query).toArray()
    //             res.send(result)
    //         })
    //         app.get('/book',async(req,res)=>{
    // const role = req.query.role
    //             const query ={}
    //             const result = await bookmodalCollection.find(query).toArray()
    //             res.send(result)
    //         })


  }
  finally {

  }
}
run()
// -------------

app.get('/', (req, res) => {

  res.send('server running')
})
app.listen(port, () => {

  console.log(`server port runtun ${port}`);
})