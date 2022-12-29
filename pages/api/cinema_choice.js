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
    const collection = db.collection('cinemas');

    const findResult = await collection.find(body).toArray();
    res.status(200).json({ result: findResult });
  
}