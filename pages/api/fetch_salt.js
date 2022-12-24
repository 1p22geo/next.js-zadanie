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
  const collection = db.collection('users');

  const findResult = await collection.find({name:body.user}).toArray();
  if(findResult.length){
    const salt = findResult[0].salt
    client.close()
    
    res.status(200).json({ result: salt })
  }
  else{
    client.close()
    
    res.status(200).json({ result: null })
  }
}