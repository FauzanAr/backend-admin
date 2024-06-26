import { z } from "zod";

export type UserLogin = z.infer<typeof userLogin>
const userLogin = z.object({
    userId: z.string().min(1).trim(),
    corporateId: z.string().min(1).trim(),
    password: z.string().min(1).trim(),
});

export type GetUserByAccount = z.infer<typeof getUserByAccount>
const getUserByAccount = z.object({
    accountNo: z.string().min(1).trim(),
})

export default {
    userLogin,
    getUserByAccount,
}