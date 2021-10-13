export default class Response<T> {
    code: Code
    msg?: Message
    data: T | Message | string

    constructor(code?: Code, data?: T | Message | string) {
        if (data) {
            this.data = data
        }

        if (code) {
            this.code = code
        }
    }
}

export enum Code {
    Success = 200,
    Error = 500,
    NotFound = 404,
    RequestError = 409,
}

export enum Message {
    Success = 'success',
    Error = 'error',
    NotFound = 'notfound',
    RequestError = 'req_error',
}
