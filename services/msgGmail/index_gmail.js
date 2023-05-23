const {request, response} = require('express')
const nodemailer = require('nodemailer');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

const sendMailFromNodeMailer = async (req = request) => {
    
    const { name, lastname, age, phone, email, address, city, country } = req.body;
    const usuarioNuevo = localStorage.getItem(usario)
    console.log(usuarioNuevo)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.SMTP_PORT,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    
    const mailOptions = {
        from: "ecommerce",
        to: ADMIN_EMAIL,
        subject: "Nuevo usuario registrado",
    
        html: `usuario: 
                    // Nombre: ${name} ${lastname}, 
                    // Edad: ${age},
                    // Telefono: ${phone},
                    // Correo: ${email},
                    // Dirección: ${address},
                    // Ciudad: ${city},
                    // Pais: ${country}`
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    sendMailFromNodeMailer
}
