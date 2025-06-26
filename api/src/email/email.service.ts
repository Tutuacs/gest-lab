import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

    constructor(private readonly mailder: MailerService){}

    async sendEmail(to: string, subject: string, context: any) {

        const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Email</title>
            </head>
            <body>
                <h1>Hello!</h1>
                <p>This is a simple email message.</p>
            </body>
        </html>
        `

        return this.mailder.sendMail({
            to,
            subject,
            html,
            context,
        });
    }


}
