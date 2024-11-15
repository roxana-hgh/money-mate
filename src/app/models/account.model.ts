export interface Account {
    id: number;
    name: string;
    number?: number;
    balance: number;
    userId: string;
    color: string;
    created_at: Date;
}