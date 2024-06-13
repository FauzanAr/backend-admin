const info = (message: string) => {
    return console.info(`[INFO]${message}`);
}

const error = (message: string) => {
    return console.error(`[ERROR]${message}`);
}

export default {
    info,
    error,
}