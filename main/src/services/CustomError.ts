class CustomError {
    constructor(
        public message: string,
        public statusCode: number,
    ) { }

    static throw(message: string, statusCode: number) {
        throw new CustomError(message, statusCode);
    }
}

export default CustomError;