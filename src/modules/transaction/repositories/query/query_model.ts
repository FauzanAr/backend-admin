import { z } from "zod";

export type GetTransaction = z.infer<typeof getTransaction>
const getTransaction = z.object({
    role: z.string().min(1).trim(),
});

export default {
    getTransaction,
}