import amqp from 'amqplib';
import { logger } from '../config/logger.js';

class RabbitMQService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            const url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
            this.connection = await amqp.connect(url);
            this.channel = await this.connection.createChannel();
            
            this.connection.on('error', (err) => {
                logger.error('RabbitMQ connection error:', err);
            });

            this.connection.on('close', () => {
                logger.info('RabbitMQ connection closed');
            });

            logger.info('Successfully connected to RabbitMQ');
        } catch (error) {
            logger.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    async publishMessage(queueName, message) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            await this.channel.assertQueue(queueName, {
                durable: true
            });

            const messageBuffer = Buffer.from(JSON.stringify(message));
            const success = this.channel.sendToQueue(queueName, messageBuffer, {
                persistent: true
            });

            if (!success) {
                throw new Error('Failed to publish message to queue');
            }

            logger.info(`Message published to queue ${queueName}`);
            return true;
        } catch (error) {
            logger.error(`Error publishing message to queue ${queueName}:`, error);
            throw error;
        }
    }

    async close() {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
            }
            logger.info('RabbitMQ connection closed successfully');
        } catch (error) {
            logger.error('Error closing RabbitMQ connection:', error);
            throw error;
        }
    }
}

export const rabbitMQService = new RabbitMQService(); 