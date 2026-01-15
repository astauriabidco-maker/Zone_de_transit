// src/pages/ClientDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

interface Client {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    company: string | null;
    phone: string | null;
    address: string | null;
    createdAt: string;
}

export default function ClientDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await api.get(`/clients/${id}`);
                setClient(response.data);
            } catch (error) {
                console.error('Erreur:', error);
                navigate('/clients'); // Redirige si client introuvable
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchClient();
    }, [id, navigate]);

    if (loading) {
        return <div style={styles.centered}>Chargement...</div>;
    }

    if (!client) {
        return null;
    }

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/clients')} style={styles.backButton}>
                ← Retour à la liste
            </button>

            <div style={styles.card}>
                <h2 style={styles.title}>
                    {client.firstName} {client.lastName}
                    {client.company && <span style={styles.company}> — {client.company}</span>}
                </h2>

                <div style={styles.infoGrid}>
                    <InfoRow label="Email" value={client.email} />
                    <InfoRow label="Téléphone" value={client.phone || '—'} />
                    <InfoRow label="Adresse" value={client.address || '—'} />
                    <InfoRow
                        label="Créé le"
                        value={new Date(client.createdAt).toLocaleDateString('fr-FR')}
                    />
                </div>
            </div>
        </div>
    );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={styles.infoRow}>
        <span style={styles.label}>{label}</span>
        <span style={styles.value}>{value}</span>
    </div>
);

const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
    },
    container: {
        padding: '24px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    backButton: {
        marginBottom: '24px',
        background: 'none',
        border: 'none',
        color: '#1e88e5',
        fontSize: '16px',
        cursor: 'pointer',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as const,
        marginBottom: '24px',
        color: '#1e293b',
    },
    company: {
        color: '#64748b',
        fontWeight: 'normal' as const,
    },
    infoGrid: {
        display: 'grid',
        gap: '16px',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '12px',
    },
    label: {
        fontWeight: '600',
        color: '#64748b',
    },
    value: {
        color: '#1e293b',
    },
};