import { Worker } from "bullmq";
import transporter from "../utils/mailTransposer";
import connection from "../config/bullmq.connection";
import EmailData from "../types/emailData";
import { SMTP_USER } from "../config";
import workerConfig from "../config/worker.config";

const emailWorker = new Worker("email", async (job) => {
    const data: EmailData = job.data

    const info = await transporter.sendMail({
        from: `SmartCV <${SMTP_USER}>`,
        to: data.to,
        subject: data.subject,
        html: data.html
    });

}, {
    connection,
    ...workerConfig,
})

export default emailWorker;