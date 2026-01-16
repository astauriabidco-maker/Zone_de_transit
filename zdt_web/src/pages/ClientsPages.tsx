// src/pages/ClientsPage.tsx
import React, { useState } from 'react';
import type { Client } from '../types/client';
import { useClients } from '../hooks/useClients';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';


export default function ClientsPage() {
    const navigate = useNavigate();
    const { clients, loading, error, addClient, updateClient, deleteClient } = useClients();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        firstName: '',
        lastName: '',
        email: '',
        activeParcels: 0,
        lastOperation: new Date().toISOString().split('T')[0],
        address: '',
        company: '',
        phone: '',
    });
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'activeParcels' ? Number(value) : value
        }));
    };

    const confirmDelete = () => {
        if (deleteConfirmId) {
            deleteClient(deleteConfirmId);
            setDeleteConfirmId(null);
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingClient) return;

        try {
            await updateClient(editingClient.id, editingClient);
            setEditingClient(null);
        } catch (err: any) {
            setSubmitError(err.message);
        }
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
                address: '',
                company: '',
                phone: '',
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
                                <td style={{ ...styles.td, padding: '8px' }}>
                                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(client.id === openMenuId ? null : client.id);
                                            }}
                                            style={styles.menuButton}
                                        >
                                            ⋮
                                        </button>
                                        {openMenuId === client.id && (
                                            <div style={styles.menuDropdown}>
                                                <button
                                                    onClick={() => {
                                                        setEditingClient(client);
                                                        setOpenMenuId(null);
                                                    }}
                                                    style={styles.menuItem}
                                                >
                                                    ✏️ Modifier
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeleteConfirmId(client.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    style={{ ...styles.menuItem, color: '#ef4444' }}
                                                >
                                                    🗑️ Supprimer
                                                </button>
                                            </div>
                                        )}
                                    </div>
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
                                <label style={styles.label}>Nom de société</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
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
                                <label style={styles.label}>Téléphone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Adresse</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 10 Rue de la Paix, 75002 Paris"
                                    style={{
                                        ...styles.input,
                                        height: '80px',
                                        resize: 'vertical' as const,
                                    }}
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

            {/* Modal de confirmation de suppression */}
            {deleteConfirmId && (
                <div style={styles.modalOverlay}>
                    <div style={styles.confirmModal}>
                        <h3 style={{ margin: 0 }}>Confirmer la suppression</h3>
                        <p>Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                style={styles.cancelButton}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{ ...styles.addButton, padding: '8px 16px' }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal d'édition */}
            {editingClient && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Modifier le client</h3>
                            <button
                                onClick={() => setEditingClient(null)}
                                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={(handleEditSubmit) => {
                            handleEditSubmit.preventDefault();
                            if (!editingClient) return;

                            // Validation côté client
                            if (!editingClient.firstName.trim() || !editingClient.lastName.trim()) {
                                alert('Prénom et nom sont requis');
                                return;
                            }

                            updateClient(editingClient.id, editingClient)
                                .then(() => {
                                    setEditingClient(null);
                                })
                                .catch((err: any) => {
                                    alert(err.message);
                                });
                        }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Prénom</label>
                                <input
                                    type="text"
                                    value={editingClient.firstName || ''}
                                    onChange={(e) => setEditingClient({ ...editingClient, firstName: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Nom</label>
                                <input
                                    type="text"
                                    value={editingClient.lastName || ''}
                                    onChange={(e) => setEditingClient({ ...editingClient, lastName: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    value={editingClient.email}
                                    onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Adresse</label>
                                <textarea
                                    value={editingClient.address || ''}
                                    onChange={(e) => setEditingClient({ ...editingClient, address: e.target.value })}
                                    style={{ ...styles.input, height: '80px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => setEditingClient(null)}
                                    style={styles.cancelButton}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    style={{ ...styles.addButton, padding: '10px 20px' }}
                                >
                                    Enregistrer
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

    menuButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '4px',
    } as const,

    menuDropdown: {
        position: 'absolute',
        top: '24px',
        right: '0',
        backgroundColor: 'white',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '160px',
        zIndex: 1000,
    } as const,

    menuItem: {
        width: '100%',
        padding: '10px 16px',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#1e293b',
    } as const,

    confirmModal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '400px',
        maxWidth: '90vw',
    } as const,

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