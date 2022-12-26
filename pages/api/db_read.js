const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  let body;
  try{body = JSON.parse(req.body)}
  catch(e){body = {}}
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'cinema';

  await client.connect();
  
  const db = client.db(dbName);
  const collection = db.collection('movies');

  const findResult = await collection.find(body.query).toArray();
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  if(session.length === 1){
    
    if(timestamp - session[0].timestamp <= 120000){
      
      authorised = true;
    }
  }
  client.close()
  if(authorised){
    res.status(200).json({ result: findResult })
  }
  else{
    res.status(401).json({ result: null })
  }
}