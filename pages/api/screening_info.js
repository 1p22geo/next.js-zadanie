const { MongoClient, ServerApiVersion } = require('mongodb');
export default async function handler(req, res) {
  let body;
  if(req.method === 'POST'){
  try{body = JSON.parse(req.body)}
  catch(e){body = {};throw "JSON parse error";}}
  else{
    res.status(200).json({})
    return;
  }
  const url = "mongodb+srv://dbuser:<PASSWORD>@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  const dbName = 'cinema';

  await client.connect();
  
  const db = client.db(dbName);
  const collection = db.collection('screenings');

  const findResult = await collection.find(body.query).toArray();
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  
  //if(session.length === 1){
    
    //if(timestamp - session[0].timestamp <= 600000){
      
      authorised = true;
    //}
  //}
  client.close()
  if(authorised){
    res.status(200).json({ result: findResult })
  }
  else{
    res.status(401).json({ result: null })
  }
}