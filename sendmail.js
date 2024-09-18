

const nodemailer = require("nodemailer")

const sendEmail = async( email )=>{

  try {
    const mailtransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    const sendDetails = {
      from: process.env.EMAIL,
      to: email, 
      subject: "ACCOUNT CREATED SUCCESFULY",
      html: `<div>
      <h1> THANKS FOR YOUR REGISTRATION </h1>
      <h3> kindly login with the details used for registration </h3>
      <h6>Keep fit and Stay Healthy!!</h6>
      </div>` 
      
    }
    
    const result = await mailtransport.sendmail(sendDetails)


  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
  
}

module.exports = sendEmail
