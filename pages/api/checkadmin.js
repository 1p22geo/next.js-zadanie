const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);
    let body;
try{body = JSON.parse(req.body)}
  catch(e){body = {}}
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  if(session.length === 1){
    
    if((timestamp - session[0].timestamp <= 120000)&&(session[0].user === "admin")){
      
      authorised = true;
    }
  }
  client.close()
  if(authorised){
    res.status(200).json({})
  }
  else{
    res.status(401).json({})
  }
}