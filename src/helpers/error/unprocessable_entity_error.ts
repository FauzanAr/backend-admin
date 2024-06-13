class UnprocessableEntity {
    message: string | Object;
    data?: Object;
    code?: number;

    constructor(param: string | {message: string, data: any, code: number}) {
        if (typeof param === 'object') {
            this.message = param.message || 'Unprocessable Entity Error!';
            this.data = param.data;
            this.code = param.code;
        } else {
            this.message = param || 'Unprocessable Entity Error!';
        }
    }
}

export default UnprocessableEntity;