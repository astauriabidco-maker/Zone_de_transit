// src/pages/ClientsPage.tsx
import React, { useState } from 'react';
import type { Client } from '../types/client';
import { useClients } from '../hooks/useClients';
import { useNavigate } from 'react-router-dom';


export default function ClientsPage() {
    const navigate = useNavigate();
    const { clients, loading, error, addClient } = useClients();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        firstName: '',
        lastName: '',
        email: '',
        activeParcels: 0,
        lastOperation: new Date().toISOString().split('T')[0],
    });
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'activeParcels' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);

        try {
            await addClient(formData);
            setIsModalOpen(false);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                activeParcels: 0,
                lastOperation: new Date().toISOString().split('T')[0],
            });
        } catch (err: any) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div style={styles.centered}>Chargement des clients...</div>;
    }

    if (error) {
        return <div style={{ ...styles.centered, color: '#ef4444' }}>{error}</div>;
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>Gestion des Clients</h3>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                    <button style={styles.exportButton}>Exporter PDF</button>
                    <button
                        style={styles.addButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Ajouter
                    </button>
                </div>
            </div>

            {/* Tableau */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>NOM</th>
                            <th style={styles.th}>EMAIL</th>
                            <th style={styles.th}>COLIS ACTIFS</th>
                            <th style={styles.th}>DERNIÈRE OPÉRATION</th>
                            <th style={styles.th}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} style={styles.tableRow}>
                                {/* Affichage combiné : Prénom + Nom */}
                                <td style={styles.td}>
                                    <span onClick={() => navigate(`/clients/${client.id}`)} style={{ color: '#1e88e5', cursor: 'pointer', fontWeight: '600' }}>
                                        {client.firstName} {client.lastName}
                                    </span>

                                </td>
                                <td style={styles.td}>{client.email}</td>
                                <td style={styles.td}>{client.activeParcels}</td>
                                <td style={styles.td}>{client.lastOperation}</td>
                                <td style={styles.td}>
                                    <span style={{ cursor: 'pointer', fontSize: '18px' }}>⋮</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal d'ajout */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Ajouter un nouveau client</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>

                        {submitError && (
                            <div style={{ color: '#ef4444', marginBottom: '16px' }}>{submitError}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Nom</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Colis actifs</label>
                                <input
                                    type="number"
                                    name="activeParcels"
                                    value={formData.activeParcels}
                                    onChange={handleInputChange}
                                    min="0"
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={styles.label}>Dernière opération</label>
                                <input
                                    type="date"
                                    name="lastOperation"
                                    value={formData.lastOperation}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={styles.cancelButton}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{ ...styles.addButton, padding: '10px 20px' }}
                                >
                                    {isSubmitting ? 'Ajout...' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Styles inchangés (identiques à votre version)
const styles = {
    exportButton: {
        padding: '8px 16px',
        backgroundColor: 'white',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#1e293b',
        cursor: 'pointer',
    } as const,
    addButton: {
        padding: '8px 16px',
        backgroundColor: '#1e293b',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
    } as const,
    tableContainer: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    } as const,
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    } as const,
    tableHeader: {
        backgroundColor: '#f8fafc',
        borderBottom: '2px solid #cbd5e1',
    } as const,
    th: {
        padding: '16px 24px',
        textAlign: 'left',
        fontSize: '14px',
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
    } as const,
    tableRow: {
        borderBottom: '1px solid #cbd5e1',
    } as const,
    td: {
        padding: '16px 24px',
        fontSize: '14px',
        color: '#1e293b',
    } as const,
    centered: {
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1e293b',
    } as const,
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    } as const,
    modal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '500px',
        maxWidth: '90vw',
    } as const,
    label: {
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#1e293b',
    } as const,
    input: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: '#f8fafc',
    } as const,
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#f1f5f9',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#1e293b',
        cursor: 'pointer',
    } as const,
};