export interface CreateUser {
    userId: string
    corporateId: number
    name: string
    role: string
    phoneNumber: string
    email: string
    password: string
}

export interface CreateCorporate {
    id: number
    name: string
}

export interface CreateOTP {
    email: string
    otp: string
    expiredAt: Date
}

export interface DeleteOTP {
    email: string
}