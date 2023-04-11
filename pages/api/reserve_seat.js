const { MongoClient, ServerApiVersion } = require('mongodb');
var nodemailer = require('nodemailer');
function a(x){
  return ((x).toString().length===1)?"0"+(x).toString():(x).toString()
}
function stringifyDate(date){
  let string = ""
  string += a(date.getDate())
  string += "."
  string += a(date.getMonth()+1)
  string += "."
  string += date.getFullYear()
  string += " "
  string += a(date.getHours())
  string += ":"
  string += a(date.getMinutes())
  return string;
}

export default async function handler(req, res) {
  
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  let body;
  try{body = JSON.parse(req.body)}
  catch(e){body = {};res.status(204).json();return;}
  const url = "mongodb+srv://dbuser:<PASSWORD>@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  const dbName = 'cinema';

  await client.connect();
  
  const db = client.db(dbName);
  const collection = db.collection('screenings');
  //const findResult = await collection.find(body).toArray();
  
  const sessions = client.db('cinema').collection('sessions')
  const session = await sessions.find({session_id:body.session}).toArray()
  const timestamp = Date.now()
  let authorised = false;
  
  if(session.length === 1){
    
    if((timestamp - session[0].timestamp <= 600000)){
      
      authorised = true;
    }
  }
  
  if(authorised){
    const screening = (await collection.findOne({cinema:body.cinema, movie_hall:body.hall, timestamp:parseInt(body.timestamp)}))
    const seat = screening.chairs[body.row][body.col]
    const user = (await client.db('cinema').collection('users').find({name:session[0].user}).toArray())[0]
    const movie = (await client.db('cinema').collection('movies').findOne({title:screening.movie}))
    console.log(await collection.updateOne({cinema:body.cinema, movie_hall:body.hall, timestamp:parseInt(body.timestamp)}, {$set:{[`chairs.${body.row}.${body.col}.user`] : session[0].user}}))
    await client.close()
    let info = await transporter.sendMail({
      from: '"Cinema" <nonexistent.cinema@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Seat purchase confirmed', // Subject line
      html: `<h1>Your seat purchase was succesful!</h1>
      <h2>You should pay me ${seat.price} zł for this seat</h2>
      <p>But the same way there is no cinema, there is no way I can charge you for this.</p>
      <hr/>
      <h2>You bought tickets for</h2>
      <h1>${screening.movie}</h1>
      <h1>${stringifyDate(new Date(screening.timestamp))}</h1>
      <h1>Row ${body.row}, seat ${body.col}</h1>
      <img src="http://localhost:3000/${movie.image}"/>`
    });
    //console.log(info, testAccount)
    
    res.status(201).json({link:nodemailer.getTestMessageUrl(info)})
  }
  else{
    await client.close()
    res.status(401).json({})
  }
}