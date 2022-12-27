const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  let body;
  try{body = JSON.parse(req.body)}
  catch(e){body = {};throw "JSON parse error";}
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'cinema';

  await client.connect();
  
  const db = client.db(dbName);

  //const findResult = await collection.find(body.query).toArray();
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  
  if(session.length === 1){
    
    if(timestamp - session[0].timestamp <= 120000){
      
      authorised = true;
      await sessions.updateOne(
        {session_id:body.session},
        {
          $set:{
            timestamp:timestamp
          }
        }
      )
    }
  }
  client.close()
  if(authorised){
    res.status(201).json({})
  }
  else{
    res.status(401).json({})
  }
}