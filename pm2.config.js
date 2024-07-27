module.exports = {
    apps: [
        {
            name: 'smartCV-backend-server',
            cwd: './backend',
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: 'production'
            },
        },
        {
            name: 'smartCV-Queue-server',
            cwd: './queue_server',
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: 'production'
            },
        },
    ],
}