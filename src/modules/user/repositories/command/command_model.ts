import { indonesianPhoneNumber } from "../../../../helpers/utils/utils";
import { z } from "zod";

export type UserRegister = z.infer<typeof userRegister>
const userRegister = z.object({
    corporateId: z.string().min(1).trim(),
    corporateName: z.string().min(1).trim(),
    userId: z.string().min(1).trim(),
    userName: z.string().min(1).trim(),
    role: z.enum(['Maker', 'Approver']),
    phoneNumber: z.string().min(1).max(18).transform(indonesianPhoneNumber),
    email: z.string().email().min(1).trim(),
    verifCode: z.string().min(1).max(6).trim(),
    password: z.string().min(6).trim(),
});

export type UserSendOtp = z.infer<typeof userSendOtp>
const userSendOtp = z.object({
    email: z.string().email().min(1).trim(),
});

export default {
    userRegister,
    userSendOtp,
}