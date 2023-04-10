const { MongoClient, ServerApiVersion } = require('mongodb');
export default async function handler(req, res) {
  const url = "mongodb+srv://dbuser:<PASSWORD>@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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