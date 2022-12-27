const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);
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
    res.status(200).json({
      user:session[0].user,
      time:timestamp-session[0].timestamp,
      active:timestamp-session[0].timestamp<120000
    })
  }
  else{
    res.status(401).json({})
  }
}