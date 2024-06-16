import { z } from 'zod';

export type CreateTransaction = z.infer<typeof createTransaction>
const createTransaction = z.object({
    referenceId: z.string().optional(),
    issuerId: z.string().min(1).trim(),
    corporateId: z.string().min(1).trim(),
    totalAmount: z.number().optional(),
    status: z.enum(["PENDING"]),
    type: z.string().min(1).trim(),
    instruction: z.enum(["IMMEDIATE", "STANDING"]),
    transferAt: z.string().optional(),
    transactionList: z.array(z.object({
        amount: z.number().min(1),
        userDestinationId: z.string().min(1),
        corporateDestinationId: z.string().min(1),
    })).min(1)
}).refine((data) => {
    if (data.instruction === 'STANDING' && !data.transferAt) {
        return false
    }

    return true;
}, {
    message: 'Time transfer is required if you choose Standing Instruction!',
    path: ['transferAt']
});

export type UpdateTransaction = z.infer<typeof updateTransaction>
const updateTransaction = z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
    transactionId: z.string().min(1).trim(),
});

export default {
    createTransaction,
    updateTransaction,
}