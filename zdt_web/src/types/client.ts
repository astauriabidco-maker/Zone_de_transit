// src/types/client.ts
export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    activeParcels: number;
    lastOperation: string; // format YYYY-MM-DD
}