import { rabbitMQService } from '../services/rabbitmq.service.js';
import { logger } from '../config/logger.js';

export const publishTestMessage = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const testMessage = {
            content: message,
            timestamp: new Date().toISOString(),
            type: 'test'
        };

        await rabbitMQService.publishMessage('deliveries-queue', testMessage);
        
        res.status(200).json({
            success: true,
            message: 'Message published successfully',
            data: testMessage
        });
    } catch (error) {
        logger.error('Error publishing test message:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to publish message'
        });
    }
}; 