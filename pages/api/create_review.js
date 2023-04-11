const { MongoClient, ServerApiVersion } = require('mongodb');
export default async function handler(req, res) {
  
  let body;
  try{body = JSON.parse(req.body)}
  catch(e){body = {};throw "JSON parse error";}
  const url = "mongodb+srv://dbuser:<PASSWORD>@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  const dbName = 'cinema';

  await client.connect();
  
  const db = client.db(dbName);
  const collection = db.collection('movies');
  //const findResult = await collection.find(body).toArray();
  
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  
  const timestamp = Date.now()
  let authorised = false;
  
  if(session.length === 1){
    
    if(timestamp - session[0].timestamp <= 600000){
      
      authorised = true;
    }
  }
  if(authorised){
  let user = (await client.db('cinema').collection('users').find({name:session[0].user}).toArray())[0]

    await collection.updateOne(
      {title:body.title},
      {$push:{
        reviews:{
          ...body.review,
          author:session[0].user,
          image:user.image
        }
      }}
    )
    await client.close()
    res.status(201).json({})
  }
  else{
    await client.close()
    res.status(401).json({})
  }
}