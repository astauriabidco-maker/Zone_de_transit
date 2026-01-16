// src/types/container.ts
export type ContainerLoadingStatus = 'UNKNOWN' | 'NOT_STARTED' | 'PARTIALLY_LOADED' | 'FULLY_LOADED' | 'SEALED';
export type ContainerUnloadingStatus = 'UNKNOWN' | 'NOT_STARTED' | 'PARTIALLY_UNLOADED' | 'FULLY_UNLOADED' | 'SEALED';
export type ContainerCreateInput = Omit<Container, 'id' | 'name' | 'closed' | 'createdAt'>;

export interface Container {
    id: string;
    name: string;
    departureDate: string | null; // YYYY-MM-DD
    arrivalDate: string | null;
    loadingStatus: ContainerLoadingStatus;
    unloadingStatus: ContainerUnloadingStatus;
    closed: boolean;
    createdAt: string;
}