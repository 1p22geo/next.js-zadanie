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
var MD5 = require("crypto-js/md5")
import { randomBytes } from 'crypto'
export default async function handler(req, res) {
  
  let body;
  try{body = JSON.parse(req.body)}
  catch(e){body = {};throw "JSON parse error";}
  const url = "mongodb+srv://dbuser:<PASSWORD>@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  const dbName = 'cinema';

  await client.connect();
  //console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');
  //const findResult = await collection.find(body).toArray();
  let r = await collection.find({name:body.name}).toArray()
  
  if(r.length === 0){
    if(body.password.length<8){
      await client.close();
      res.status(400).json({reason:1});
      return;
    }
    if(!(body.password.match(/[0-9]/))){
      await client.close();
      res.status(400).json({reason:2});
      return;
    }
    if(!(body.password.match(/[A-Z]/))){
      await client.close();
      res.status(400).json({reason:3});
      return;
    }
    if(!(body.password.match(/[^A-Za-z0-9]/))){
      await client.close();
      res.status(400).json({reason:4});
      return;
    }
    if(!(body.email.match(/^[\w-\.]+@[\w-]+\.+[\w-]{2,4}$/))){
      await client.close();
      res.status(400).json({reason:5});
      return;
    }
    let salt = randomBytes(32).toString('hex')
    let md5 = MD5(body.password+salt).toString()
    let x = base64ToFile(body.file)
    collection.insertOne(
      {
        name:body.name,
        salt:salt,
        md5:md5,
        email:body.email,
        image:x
      }).then((response)=>{
        setTimeout(async ()=>{await client.close()}, 1000);
    
        res.status(201).json({})
        return;
      },
      (err)=>{//TODO:How to test it
        setTimeout(async ()=>{await client.close()}, 1000);
    
        res.status(500).json({})
        return;
      })
    
  }
  else{
   await client.close()
   res.status(409).json({})
   return;
  }

}