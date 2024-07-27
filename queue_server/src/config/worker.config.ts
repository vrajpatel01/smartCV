export default {
    limiter: {
        max: 5,
        duration: 1000
    },
    removeOnComplete: {
        count: 5
    },
    removeOnFail: {
        count: 10
    },
} as WorkerOptions;