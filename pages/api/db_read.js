const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  let body;
  try{body = JSON.parse(req.body)}
  catch(e){body = {}}
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'test';

  await client.connect();
  //console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('test');

  const findResult = await collection.find(body).toArray();
  client.close()
  
  res.status(200).json({ result: findResult })
}