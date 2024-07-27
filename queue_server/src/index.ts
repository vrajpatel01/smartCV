import emailWorker from "./workers/email.worker";


emailWorker.on("completed", (job) => {
    console.log(`Job with id ${job.id} has been completed`);
})