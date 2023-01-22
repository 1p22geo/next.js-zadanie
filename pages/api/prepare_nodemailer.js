var nodemailer = require('nodemailer');
export default async function handler(req, res) {
  
  let testAccount = await nodemailer.createTestAccount();
 
  res.status(200).json({})
}