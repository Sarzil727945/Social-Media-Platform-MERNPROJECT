require('dotenv').config();
const express = require('express');
const cors = require('cors');
// // jwt
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2a9l2qr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// jwt verify start 
const verifyJwt = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' })
  }
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}
// jwt verify end


async function run() {
  try {

    // server link start
    const usersCollection = client.db('SocialMediaPlatform').collection('users');
    const allPostCollection = client.db('SocialMediaPlatform').collection('allPost');
    const messageCollection = client.db('SocialMediaPlatform').collection('message');
    const likeCollection = client.db('SocialMediaPlatform').collection('like');
    const friendCollection = client.db('SocialMediaPlatform').collection('friendRequest');
    // server link end 

    // jwt localhost start
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
      });
      res.send({ token });
    })
    // jwt localhost end

    // Warning: use verifyJWT before using verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }
      const user = await usersCollection.findOne(query);
      if (user?.role !== 'admin') {
        return res.status(403).send({ error: true, message: 'forbidden message' });
      }
      next();
    }

    // allPost added post mongoDB start
    app.post('/allPost', async (req, res) => {
      const newAdd = req.body;
      const result = await allPostCollection.insertOne(newAdd)
      res.send(result);
    });
    // allPost added post mongoDB end

    // get allPost data server start
    app.get('/allPost', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await allPostCollection.find(query).toArray();
      res.send(result);
    })
    //  get allPost data server end 

    // search part start
    app.get("/postSearchText/:text", async (req, res) => {
      const text = req.params.text;
      const result = await allPostCollection
        .find({
          $or: [
            // { Bio: { $regex: text, $options: "i" } },
            { displayName: { $regex: text, $options: "i" } },
            { email: { $regex: text, $options: "i" } },
          ],
        })
        .toArray();
      res.send(result);
    });
    // search part exit 

    // server data update start
    app.put('/allPost/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatePost = req.body;
      const addPost = {
        $set: {
          Bio: updatePost.Bio,
          fileImg: updatePost.fileImg,
        }
      }
      const result = await allPostCollection.updateOne(filter, addPost, options);
      res.send(result)
    })
    // server data update end 

    // selected data delete mongoDB start
    app.delete('/allPost/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await allPostCollection.deleteOne(query);
      res.send(result);
    })
    // selected data delete mongoDB  exit

    //  allPost data patch start 
    app.patch('/allPost/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedClasses = req.body;

      const updateDoc = {
        $set: {
          status: updatedClasses.status
        }
      }
      const result = await allPostCollection.updateOne(filter, updateDoc)
      res.send(result)
    })
    //  allPost data patch end

    // allMessage added post mongoDB start
    app.post('/message', async (req, res) => {
      const newAdd = req.body;
      const result = await messageCollection.insertOne(newAdd)
      res.send(result);
    });
    // allMessage added post mongoDB end

    // get allMessage data server start
    app.get('/message', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await messageCollection.find(query).toArray();
      res.send(result);
    })
    //  get allMessage data server end 

    // allLike added post mongoDB start
    app.post('/like', async (req, res) => {
      const newAdd = req.body;
      // one like check  part start
      const query = { email: newAdd.email, likeId: newAdd.likeId }
      const existingUser = (await likeCollection.findOne(query));
      if (existingUser) {
        return res.send({ message: 'like already exists' })
      }
      // one like check  part end
      else {
        const result = await likeCollection.insertOne(newAdd)
        res.send(result);
      }
    });
    // allLike added post mongoDB end

    // get allLike data server start
    app.get('/like', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await likeCollection.find(query).toArray();
      res.send(result);
    })
    //  get allLike data server end 

    // delete Like data server start
    app.delete('/like/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await likeCollection.deleteOne(query);
      res.send(result);
    })
    //  delete Like data server end 

    // user data post dataBD start 
    app.post('/users', async (req, res) => {
      const user = req.body;
      // google sign up part start
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'user already exists' })
      }
      // google sign up part end
      else {
        const result = await usersCollection.insertOne(user)
        res.send(result);
      }
    });
    // user data post dataBD exit

    // admin user information get  start
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    // admin user information get end

    // search part start
    app.get("/userSearchText/:text", async (req, res) => {
      const text = req.params.text;
      const result = await usersCollection
        .find({
          $or: [
            { name: { $regex: text, $options: "i" } },
            { email: { $regex: text, $options: "i" } },
          ],
        })
        .toArray();
      res.send(result);
    });
    // search part exit 

    // friendRequest added post mongoDB start
    app.post('/friendRequest', async (req, res) => {
      const newAdd = req.body;
      // one friendRequest check  part start
      const query = { email: newAdd.email, rId: newAdd.rId }
      const existingUser = (await friendCollection.findOne(query));
      if (existingUser) {
        return res.send({ message: 'friend Request already exists' })
      }
      // one friendRequest check  part end
      else {
        const result = await friendCollection.insertOne(newAdd)
        res.send(result);
      }
    });
    // friendRequest added post mongoDB end

    // get friendRequest data server start
    app.get('/friendRequest', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await friendCollection.find(query).toArray();
      res.send(result);
    })
    //  get friendRequest data server end 

    //  patch friendRequest data server start 
    app.patch('/friendRequest/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedBooking = req.body;
      const updateDoc = {
        $set: {
          request: updatedBooking.request
        },
      };
      const result = await friendCollection.updateOne(filter, updateDoc)
      res.send(result);
    })
    //  patch friendRequest data server end 

    // delete friendRequest data server start
    app.delete('/friendRequest/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await friendCollection.deleteOne(query);
      res.send(result);
    })
    //  delete friendRequest data server end 

    // user data delete mongoDB start
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })
    // user data delete mongoDB  exit

    // user admin check start
    app.get('/users/admin/:email', verifyJwt, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }

      // jwt verifyJwt start
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ error: true, message: 'forbidden access' })
      }
      // jwt verifyJwt end

      const query = { email: email }
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === 'admin' }
      res.send(result);
    })
    // user admin check end

    // user admin role added start
    app.patch('/users/admin/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    })
    // user admin role added exit


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Social Media Platform')
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})

