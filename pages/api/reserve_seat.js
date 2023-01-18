const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  
  const body = JSON.parse(req.body)
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'cinema';

  await client.connect();
  
  const db = client.db(dbName);
  const collection = db.collection('screenings');
  //const findResult = await collection.find(body).toArray();
  
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  if(session.length === 1){
    
    if((timestamp - session[0].timestamp <= 600000)){
      
      authorised = true;
    }
  }
  
  if(authorised){
    console.log(await collection.updateOne({cinema:body.cinema, movie_hall:body.hall, timestamp:parseInt(body.timestamp)}, {$set:{[`chairs.${body.row}.${body.col}.user`] : session[0].user}}))
    await client.close()
    res.status(201).json({})
  }
  else{
    await client.close()
    res.status(401).json({})
  }
}