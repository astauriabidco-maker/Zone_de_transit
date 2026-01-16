// src/hooks/useContainers.tsx
import { useState, useEffect } from 'react';
import api from '../lib/api';
import type { Container, ContainerCreateInput } from '../types/container';

export function useContainers() {
    const [containers, setContainers] = useState<Container[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContainers = async () => {
        try {
            const response = await api.get('/containers');
            setContainers(response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addContainer = async (data: ContainerCreateInput) => {
        try {
            await api.post('/containers', data);
            await fetchContainers();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const getNextName = async (): Promise<string> => {
        const response = await api.get('/containers/next-name');
        return response.data;
    };

    useEffect(() => {
        fetchContainers();
    }, []);

    return { containers, loading, error, addContainer, getNextName };
}