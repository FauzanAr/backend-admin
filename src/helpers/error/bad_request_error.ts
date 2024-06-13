class BadRequestError {
    message: string | Object;
    data?: Object;
    code?: number;

    constructor(param: string | {message: string, data: any, code: number}) {
        if (typeof param === 'object') {
            this.message = param.message || 'Bad Request';
            this.data = param.data;
            this.code = param.code;
        } else {
            this.message = param || 'Bad Request';
        }
    }
}

export default BadRequestError;