require('dotenv').config()
const twilio = require('twilio')

const TWILIO_ACOUNT_SID= process.env.TWILIO_ACOUNT_SID;
const TWILIO_AUTH_TOKEN= process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER= process.env.TWILIO_PHONE_NUMBER;

const client = twilio 
(
    TWILIO_ACOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER    
)

async function envioWhatsapp() {

    let result = await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+573107183388',
        body: `Nuevo usuario registrado:`
    })

}

module.exports = envioWhatsapp