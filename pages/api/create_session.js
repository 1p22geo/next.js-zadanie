import { randomBytes } from 'crypto';

const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  let body;
  try{body = JSON.parse(req.body)}
  catch(e){body = {};throw "JSON parse error";}
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'cinema';

  await client.connect();
  //console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  const findResult = await collection.find({name:body.user}).toArray();
  let user = findResult[0];
  
  if(body.md5 === user.md5){
    let session_id = randomBytes(32).toString('hex')
    const sessions = db.collection('sessions');
    await sessions.insertOne({
      user:body.user,
      timestamp:Date.now(),
      session_id:session_id
    })
    client.close()
    //console.log('session created')
    res.status(201).json({ session: session_id })// 201 created
  }
  else{
    client.close()
    //console.log('session refused')
    res.status(401).json({ session: null })// 401 unauthorised
  }
  
  
  //res.status(200).json({ result: findResult })
}