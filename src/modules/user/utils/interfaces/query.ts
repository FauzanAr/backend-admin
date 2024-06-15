export interface GetUserByEmail {
    email: string
}

export interface GetUserByUserIdAndCorporateId {
    userId: string
    corporateId: number
}

export interface GetUserOtpByEmail {
    email: string
}

export interface GetUserDetailJWT {
    id?: string
    userId?: string
    corporateId?: number
    name?: string
    role?: string
    phoneNumber?: string
    email?: string
    lastLoginAt?: string
    iat?: number
    exp?: number
}