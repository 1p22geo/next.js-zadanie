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
    let screenings = await db.collection('screenings').find(
      {
        cinema:body.screening.cinema,
        timestamp:body.screening.timestamp,
        movie_hall:body.screening.movie_hall
      }).toArray()
    if(screenings.length !== 0){
      authorised = false;
      await client.close()
      res.status(409).json({})
      return;
    }
    await collection.updateOne(
      { title: body.title },
      {
        $push: {
          screening: body.screening
        }
      }
    )
    let cinema = await db.collection('cinemas').find({code:body.screening.cinema}).toArray()
    console.log(cinema)
    if(cinema.length !== 1){
      res.status(400).json({})
      return;
    }
    let chairs = cinema[0].movie_halls[body.screening.movie_hall]
    await db.collection('screenings').insertOne(
      {
        ...body.screening,
        chairs: chairs,
        movie:body.title
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