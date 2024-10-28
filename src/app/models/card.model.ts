export interface Account {
    id: bigint;
    name: string;
    number?: number;
    balance: number;
    userId: string;
    color: string;
    created_at: Date;
}