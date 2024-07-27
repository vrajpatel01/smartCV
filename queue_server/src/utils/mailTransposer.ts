import nodemailer, { TransportOptions } from 'nodemailer';
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '../config';

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
} as TransportOptions);

export default transporter;