// src/pages/ContainerDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import type { Container, ContainerWithParcels } from '../types/container';

const LOADING_STATUS_LABELS: Record<Container['loadingStatus'], string> = {
    UNKNOWN: 'Inconnu',
    NOT_STARTED: 'Pas encore',
    PARTIALLY_LOADED: 'Partiellement',
    FULLY_LOADED: 'Totalement',
    SEALED: 'Fermé',
};

const UNLOADING_STATUS_LABELS: Record<Container['unloadingStatus'], string> = {
    UNKNOWN: 'Inconnu',
    NOT_STARTED: 'Pas encore',
    PARTIALLY_UNLOADED: 'Partiellement',
    FULLY_UNLOADED: 'Totalement',
    SEALED: 'Fermé',
};

export default function ContainerDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [container, setContainer] = useState<Container | null>(null);
    const [parcels, setParcels] = useState<ContainerWithParcels['parcels'] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContainer = async () => {
            try {
                const response = await api.get(`/containers/${id}`);
                setContainer(response.data);
                setParcels(response.data.parcels);
            } catch (error) {
                console.error('Erreur:', error);
                navigate('/containers');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchContainer();
    }, [id, navigate]);

    if (loading) {
        return <div style={styles.centered}>Chargement...</div>;
    }

    if (!container) {
        return null;
    }

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/containers')} style={styles.backButton}>
                ← Retour à la liste
            </button>

            <div style={styles.card}>
                <h2 style={styles.title}>{container.name}</h2>

                <div style={styles.infoGrid}>
                    <InfoRow label="Date de départ prévue" value={container.departureDate || '—'} />
                    <InfoRow label="Date d'arrivée prévue" value={container.arrivalDate || '—'} />
                    <InfoRow label="État du chargement" value={LOADING_STATUS_LABELS[container.loadingStatus]} />
                    <InfoRow label="État du déchargement" value={UNLOADING_STATUS_LABELS[container.unloadingStatus]} />
                    <InfoRow
                        label="Créé le"
                        value={new Date(container.createdAt).toLocaleDateString('fr-FR')}
                    />
                </div>

                {/* Liste des colis associés */}
                {parcels && parcels.length > 0 && (
                    <div style={{ marginTop: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                            Colis associés ({parcels.length})
                        </h3>
                        <div style={styles.parcelsList}>
                            {parcels.map(parcel => (
                                <div key={parcel.id} style={styles.parcelItem}>
                                    <div><strong>{parcel.destination}</strong></div>
                                    <div>{parcel.client?.company || `${parcel.client?.firstName} ${parcel.client?.lastName}`}</div>
                                    <div style={{ color: '#64748b', fontSize: '12px' }}>{parcel.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
    parcelsList: {
        display: 'grid',
        gap: '12px',
        marginTop: '12px',
    },
    parcelItem: {
        padding: '12px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
    },
};