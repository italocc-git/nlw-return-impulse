import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from 'nodemailer'
export class NodeMailerMailAdapter implements MailAdapter {
    
    
    async sendMail ({subject , body}: SendMailData) {
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "74bfd8450cf980",
              pass: "59d8e67b021dae"
            }
          });

        await transport.sendMail({
            from:'Equipe Feedget <oi@feedget.com>',
            to: 'Italo Costa <italocc16@gmail.com>', 
            subject,
            html: body
        })
    }
}