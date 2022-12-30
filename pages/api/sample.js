const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const dbName = 'cinema';

  await client.connect();
  
  const db = client.db(dbName);
  const collection = db.collection('movies');

  const findResult = await collection.aggregate(
    [
      {
        $sample:
        {
          size:4
        }
      },
      {
        $project:
        {
          reviews:0,
          screening:0
        }
      }
    ]
    ).toArray();

  await client.close()
  res.status(200).json({ result: findResult })
  
}