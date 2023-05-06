import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {ReportPayload, ResetPasswordPayload, VerificationPayload} from '@libs/jobs';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendResetEmail(data: ResetPasswordPayload) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: 'Reset password request - URL Shortener',
      text: `Reset password request. Your reset link: ${data.link}`,
      template: 'reset',
      context: {
        link: data.link,
        name: data.name,
      },
    });
  }

  sendVerificationEmail(data: VerificationPayload) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: 'Verify your account - URL Shortener',
      text: `Account verification. Your verification link: ${data.link}`,
      template: 'verification',
      context: {
        link: data.link,
        name: data.name,
      },
    });
  }

  sendReportEmail(data: ReportPayload) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: `Report: ${data.reportId} - ${data.alias}:${data.type}`,
      text: `Alias: ${data.alias}\nType: ${data.type}\nURL: ${data.url}\nReport: ${data.reportId}\n\nMessage: ${data.message}`,
      template: 'report',
      context: {
        reportId: data.reportId,
        url: data.url,
        alias: data.alias,
        type: data.type,
        message: data.message,
      },
    });
  }
}
