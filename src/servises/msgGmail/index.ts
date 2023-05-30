import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
// import nodemailer from "npm:nodemailer"
import { ADMIN_EMAIL, GMAIL_PASSWORD, GMAIL_USER, SMTP_PORT} from '../../../config/index.ts';
import { IUser } from "../../models/model_user.ts";

export const sendMailFromNodeMailer = async (newUser: IUser) => {
    
    const {name, lastname, age, phone, email, address, city, country} = newUser;

    const transporter = new SMTPClient({
       
            connection: {
                hostname: "smtp.gmail.com",
                port: (SMTP_PORT),
                tls: false,
                auth: {
                  username: GMAIL_USER,
                  password: GMAIL_PASSWORD,
                },
            },
       
    });
  
    await transporter.send({
        from: "ecommerce@gmail.com",
        to: ADMIN_EMAIL,
        subject: "Nuevo usuario registrado",
    
        html: `usuario: 
                    Nombre: ${name} ${lastname}, 
                    Edad: ${age},
                    Telefono: ${phone},
                    Correo: ${email},
                    Dirección: ${address},
                    Ciudad: ${city},
                    Pais: ${country}`
    });
   
    
    await transporter.close();
}