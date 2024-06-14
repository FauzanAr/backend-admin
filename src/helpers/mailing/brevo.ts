import {TransactionalEmailsApi, SendSmtpEmail} from '@getbrevo/brevo';
import { SendEmail } from '../interfaces/brevo';
import config from '../config';
import wrapper from '../utils/wrapper';
import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';

export const sendEmail = async (payload: SendEmail) => {
    const transaction = new TransactionalEmailsApi();
    const email = new SendSmtpEmail();

    email.subject = payload.subject;
    email.sender = {name: "NBC Register", email: "no-reply@nbc.mail.com"};
    email.to = payload.to;
    email.params = payload.params;

    try {
        const htmlFilePath = path.join(__dirname, 'send-otp.html');
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        email.htmlContent = htmlContent;
    } catch (err) {
        logger.error(`Error reading HTML file: ${err}`)
        return wrapper.error(`Failed to reading HTML email content`)
    }

    const result = await transaction.sendTransacEmail(email, {headers: {'api-key': config.brevo.apiKey}})
    logger.info(`${JSON.stringify(result)}`);
    return wrapper.data('Success sending email!');
}