class InternalServiceError {
    message: string | Object;
    data?: Object;
    code?: number;

    constructor(param: string | {message: string, data: any, code: number}) {
        if (typeof param === 'object') {
            this.message = param.message || 'Internal Service Error';
            this.data = param.data;
            this.code = param.code;
        } else {
            this.message = param || 'Internal Service Error';
        }
    }
}

export default InternalServiceError;