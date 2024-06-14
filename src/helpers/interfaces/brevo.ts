export interface SendEmail {
    subject: string,
    to: To[],
    params: Params,
}

interface To {
    email: string
    name: string
}

interface Params {
    userName: string
    otp: string
}