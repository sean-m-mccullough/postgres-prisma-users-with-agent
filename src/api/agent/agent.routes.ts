import express from 'express';

import { agentCommand } from './agent.controller';

const router = express.Router();

// routes
router.post('/', agentCommand);

export default router;