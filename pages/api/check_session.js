const { MongoClient, ServerApiVersion } = require('mongodb');
export default async function handler(req, res) {
    const url = "mongodb+srv://dbuser:<PASSWORD>@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    let body;
try{body = JSON.parse(req.body)}
  catch(e){body = {};throw "JSON parse error";}
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  if(session.length === 1){
    
      authorised = true;
    
  }
  client.close()
  if(authorised){
    let user = (await client.db('cinema').collection('users').find({name:session[0].user}).toArray())[0]
    res.status(200).json({
      user:session[0].user,
      time:timestamp-session[0].timestamp,
      active:timestamp-session[0].timestamp<600000,
      image:user.image
    })
  }
  else{
    res.status(401).json({})
  }
}