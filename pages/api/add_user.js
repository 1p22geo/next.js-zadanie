const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  
  const body = JSON.parse(req.body)
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'cinema';

  await client.connect();
  //console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');
  //const findResult = await collection.find(body).toArray();
  let r = await collection.find({name:body.name}).toArray()
  if(r.length === 0){
    collection.insertOne(
      {
        ...body,
        type:"user"
      }).then((response)=>{
        setTimeout(async ()=>{await client.close()}, 1000);
    
        res.status(201).json({})
      },
      (err)=>{//TODO:How to test it
        setTimeout(async ()=>{await client.close()}, 1000);
    
        res.status(500).json({})
      })
    
  }
  else{
   await client.close()
   res.status(409).json({})
  }

}