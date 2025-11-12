import { Request, Response, NextFunction } from 'express';
import { callAgent, callRestApi } from './agent.service';

export const agentCommand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { input } = req.body;

        if (!input) {
            return res.status(400).json({ error: 'Input is required' });
        }

        const agentResponse = await callAgent(input);
        const result = await callRestApi(agentResponse.tool, agentResponse.args);
        res.json({ result });
    } catch (error) {
        next(error);
    }
};