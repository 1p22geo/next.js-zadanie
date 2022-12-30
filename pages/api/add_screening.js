const { MongoClient } = require('mongodb');
export default async function handler(req, res) {

  const body = JSON.parse(req.body)
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'cinema';

  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection('movies');
  //const findResult = await collection.find(body).toArray();

  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({ session_id: body.session }).toArray()
  const timestamp = Date.now()
  let authorised = false;

  if (session.length === 1) {

    if ((timestamp - session[0].timestamp <= 600000) && (session[0].user == 'admin')) {

      authorised = true;
    }
  }
  console.log(authorised)

  if (authorised) {
    await collection.updateOne(
      { title: body.title },
      {
        $push: {
          screening: body.screening
        }
      }
    )
    await client.close()
    res.status(201).json({})
  }
  else {
    await client.close()
    res.status(401).json({})
  }
}