const { Queue } = require('bullmq'); // * Import Queue class from bullmq

const emailQueue = new Queue('emailQueue', {
    connection: {
        host: '127.0.0.1',
        port: '6379',
    }
}); // * Create a new Queue instance with the name 'emailQueue'

// * Add a job to the queue
exports.addEmailJobToQueue = async (jobData) => {
    await emailQueue.add('sendEmail', jobData, {
        removeOnComplete: true, removeOnFail: { age: 5 * 3600 }, attempts: 3
    }); // * Add a job to the queue with the jobData
    console.log('Email job added to the queue.', jobData); // * Log a message to the console
};