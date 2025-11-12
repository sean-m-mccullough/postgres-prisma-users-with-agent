export const createUserTool = {
    name: 'createUser',
    description: 'Create a new user',
    parameters: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' }
        },
        required: ['name', 'email']
    }
};

export const getUserTool = {
    name: 'getUser',
    description: 'Get user details by ID',
    parameters: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    }
};

export const getAllUsersTool = {
    name: 'getAllUsers',
    description: 'Retrieve a list of all users',
    parameters: {
        type: 'object',
        properties: {}
    }
};

export const updateUserTool = {
    name: 'updateUser',
    description: 'Update user details by ID',
    parameters: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' }
        },
        required: ['id']
    }
};

export const deleteUserTool = {
    name: 'deleteUser',
    description: 'Delete user by ID',
    parameters: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    }
};

export const allTools = [
    createUserTool,
    getUserTool,
    getAllUsersTool,
    updateUserTool,
    deleteUserTool
];