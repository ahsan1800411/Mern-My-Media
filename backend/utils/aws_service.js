require('dotenv').config();
const aws = require('aws-sdk');
const { logEvent } = require('../controllers/log');

class awsService {
	constructor() {
		this.sqs = new aws.SQS({
			accessKeyId: process.env.aws_access_key_id,
			secretAccessKey: process.env.aws_secret_access_key,
			region: process.env.region_name,
		});
	}

	sendQueueMessage = async (message) => {
		console.log('sending queue ',message);
		try {
			const params = {
				MessageBody: JSON.stringify(message),
				QueueUrl: process.env.queue_url_request,
			};
			await this.sqs.sendMessage(params).promise();
			await logEvent(`sent a queue message: ${JSON.stringify(message)}`);
			return true;
		} catch (error) {
			console.log(error);
			await logEvent('failed to send a queue message');
			return false;
		}
	};

	deleteMessage = async (message) => {
		await this.sqs
					.deleteMessage({
						QueueUrl: process.env.queue_url_response,
						ReceiptHandle: message.ReceiptHandle,
					})
					.promise();
	}

	receiveQueueMessage = async () => {
		try {
			const params = {
				QueueUrl: process.env.queue_url_response,
				MaxNumberOfMessages: 5,
				VisibilityTimeout: process.env.queue_visibility_timeout,
				WaitTimeSeconds: process.env.queue_wait_time_seconds,
			};
			const response = await this.sqs.receiveMessage(params).promise();
			if (response && response.Messages && response.Messages.length > 0) {
				//const message = JSON.parse(response.Messages[0].Body);
				return response.Messages;
			} else {
				await logEvent('didn not find any messages in response queue');
				return [];
			}
		} catch (error) {
			console.log(error);
			await logEvent('failed to get a message from response queue');
			return false;
		}
	};

	getSendeQueueUrl = () => {
		return process.env.queue_url_request;
	};

	getReceiveQueueUrl = () => {
		return process.env.queue_url_response;
	};
}

module.exports = awsService;
