// src/hooks/useClients.tsx
import { useState, useEffect } from 'react';
import api from '../lib/api';
import type { Client } from '../types/client';

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = async () => {
        try {
            const response = await api.get('/clients');
            // Mappe la réponse backend au type frontend
            const mapped = response.data.map((c: any) => ({
                id: c.id,
                firstName: c.firstName,
                lastName: c.lastName,
                email: c.email,
                activeParcels: 0, // à calculer plus tard via API
                lastOperation: c.createdAt.split('T')[0],
            }));
            setClients(mapped);
        } catch (err: any) {
            setError(err.message || 'Erreur lors du chargement des clients');
        } finally {
            setLoading(false);
        }
    };

    const addClient = async (clientData: Omit<Client, 'id'>) => {
        try {
            await api.post('/clients', clientData);
            await fetchClients(); // Rafraîchit la liste
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Erreur lors de l’ajout');
        }
    };

    const updateClient = async (id: string, clientData: Partial<Client>) => {
        try {
            await api.put(`/clients/${id}`, clientData);
            await fetchClients();
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Erreur lors de la modification');
        }
    };

    const deleteClient = async (id: string) => {
        try {
            await api.delete(`/clients/${id}`);
            await fetchClients();
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Erreur lors de la suppression');
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return { clients, loading, error, addClient, updateClient, deleteClient };
}