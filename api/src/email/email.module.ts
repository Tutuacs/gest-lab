import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { env } from 'process';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASS,
        },
      },
      defaults: {
        from: 'Gestão Laboratorial'
      }
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule { }
