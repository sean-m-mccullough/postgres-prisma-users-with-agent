import OpenAI from 'openai';
import { allTools } from './agent.tools';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const convertToolsToOpenAIFormat = () => {
    return allTools.map(tool => ({
        type: 'function' as const,
        function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters
        }
    }));
};

const extractToolCall = (response: OpenAI.Chat.Completions.ChatCompletion) => {
    const toolCall = response.choices[0]?.message?.tool_calls?.[0];
    
    if (!toolCall || toolCall.type !== 'function') {
        throw new Error('No tool selected by agent');
    }

    return {
        tool: toolCall.function.name,
        args: JSON.parse(toolCall.function.arguments)
    };
};

export const callAgent = async (input: string) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: input }],
        tools: convertToolsToOpenAIFormat(),
        tool_choice: 'auto'
    });

    return extractToolCall(response);
};

const getBaseUrl = (): string => {
    const baseUrl = process.env.API_BASE_URL;
    if (!baseUrl) {
        throw new Error('API_BASE_URL environment variable is not set');
    }
    return baseUrl;
};

const makeRequest = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    return response.json();
};

export const callRestApi = async (tool: string, args: any) => {
    const baseUrl = getBaseUrl();
    
    switch (tool) {
        case 'createUser':
            return makeRequest(`${baseUrl}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(args)
            });
            
        case 'getUser':
            return makeRequest(`${baseUrl}/users/${args.id}`);

        case 'getAllUsers':
            return makeRequest(`${baseUrl}/users`);
            
        case 'updateUser': {
            const { id, ...updateData } = args;
            return makeRequest(`${baseUrl}/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
        }
            
        case 'deleteUser':
            return makeRequest(`${baseUrl}/users/${args.id}`, {
                method: 'DELETE'
            });
            
        default:
            throw new Error(`Unknown tool: ${tool}`);
    }
};