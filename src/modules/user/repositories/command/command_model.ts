import { z } from "zod";

export type UserRegister = z.infer<typeof userRegister>
const userRegister = z.object({
    corporateId: z.string().min(1).trim(),
    corporateName: z.string().min(1).trim(),
    userId: z.string().min(1).trim(),
});

export default {
    userRegister,
}