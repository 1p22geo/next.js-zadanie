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