import { Transaction, TransactionList } from "../../../../helpers/databases/mysql/connection";

export interface CreateTransactionDB extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CreateTransactionListDB extends Omit<TransactionList, 'id'> {}

export interface UpdateTransactionDB {
    id: number
    status: string
}