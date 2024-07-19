const { Worker } = require('bullmq');
const otpServices = require('../services/otpServices');

const emailQueueWorker = new Worker("emailQueue", async (job) => {
  console.log(`Sending email to ${job.data.email}`);
  const generatedOTP = otpServices.generateOTP(job.data.email);
  await otpServices.sendOTPEmail(job.data.email, generatedOTP);
}, {
    connection: {
        host: '127.0.0.1',
        port: '6379',
    }
});

emailQueueWorker.on("failed", (job, err) => {
  console.error(`Email sending failed to ${job.data.email}: ${err}`);
});

emailQueueWorker.on("completed", (job) => {
  console.log(`Email sent to ${job.data.email}`);
});
