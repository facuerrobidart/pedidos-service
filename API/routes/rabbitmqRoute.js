import express from 'express';
import { publishTestMessage } from '../controllers/rabbitmqController.js';

const router = express.Router();

router.post('/test-publish', publishTestMessage);

export default router; 