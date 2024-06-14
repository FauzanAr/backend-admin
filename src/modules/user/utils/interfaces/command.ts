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