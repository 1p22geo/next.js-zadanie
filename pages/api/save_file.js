const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
function base64ToFile(file) {
  const fileContents = file.base64.replace(/^data:.{2,20};base64,/, "");

  
  fs.mkdirSync("./public/uploads", { recursive: true });
  const aaa = `uploads/${Date.now().toString() + file.fileName}`
  const fileName = `./public/${aaa}`
 
  fs.writeFile(fileName, fileContents, 'base64', function (err) { console.log(err) });
  return aaa
 }

export default async function handler(req, res) {
  let body = JSON.parse(req.body)
  const url = "mongodb+srv://dbuser:<PASSWORD>@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  await client.connect();
  

  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  
  if(session.length === 1){
    
    if(timestamp - session[0].timestamp <= 600000){
      
      authorised = true;
    }
  }
  client.close()
  if(authorised){
  
    let x = base64ToFile(body.file)
    res.status(200).json({filename:x})
  }
  else{
    res.status(401).json({})
  }
  
  

}