// src/pages/ContainersPage.tsx
import React, { useEffect, useState } from 'react';
import { useContainers } from '../hooks/useContainers';
import type { Container } from '../types/container';

// Labels lisibles pour les statuts
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

export default function ContainersPage() {
    const { containers, loading, error, addContainer, getNextName, updateContainer, deleteContainer } = useContainers();
    const [menuPosition, setMenuPosition] = useState<{ id: string; x: number; y: number } | null>(null);
    const [editingContainer, setEditingContainer] = useState<Container | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [initialName, setInitialName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<Container, 'id' | 'closed' | 'createdAt'>>({
        name: '',
        departureDate: '',
        arrivalDate: '',
        loadingStatus: 'UNKNOWN',
        unloadingStatus: 'UNKNOWN',
    });
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Ferme le menu si on clique en dehors
    useEffect(() => {
        const handleClickOutside = () => {
            if (menuPosition) {
                setMenuPosition(null);
            }
        };

        if (menuPosition) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuPosition]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);

        try {
            await addContainer(formData);
            setIsModalOpen(false);
            setFormData({
                name: '',
                departureDate: '',
                arrivalDate: '',
                loadingStatus: 'UNKNOWN',
                unloadingStatus: 'UNKNOWN',
            });
        } catch (err: any) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const loadNextName = async () => {
            try {
                const name = await getNextName();
                setInitialName(name);
                setFormData(prev => ({ ...prev, name }));
            } catch (err) {
                console.error('Erreur chargement nom:', err);
                setInitialName('CONT-001');
                setFormData(prev => ({ ...prev, name: 'CONT-001' }));
            }
        };

        loadNextName();
    }, [getNextName]);

    if (loading) {
        return <div style={styles.centered}>Chargement des conteneurs...</div>;
    }

    if (error) {
        return <div style={{ ...styles.centered, color: '#ef4444' }}>{error}</div>;
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>Gestion des Conteneurs</h3>
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
                            <th style={styles.th}>DÉPART PRÉVU</th>
                            <th style={styles.th}>ARRIVÉE PRÉVUE</th>
                            <th style={styles.th}>CHARGEMENT</th>
                            <th style={styles.th}>DÉCHARGEMENT</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {containers.map((container) => (
                            <tr key={container.id} style={styles.tableRow}>
                                <td style={styles.td}>{container.name}</td>
                                <td style={styles.td}>{container.departureDate || '—'}</td>
                                <td style={styles.td}>{container.arrivalDate || '—'}</td>
                                <td style={styles.td}>{LOADING_STATUS_LABELS[container.loadingStatus]}</td>
                                <td style={styles.td}>{UNLOADING_STATUS_LABELS[container.unloadingStatus]}</td>
                                {/* Colonne Actions */}
                                <td style={{ ...styles.td, padding: '8px' }}>
                                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                // Affiche le menu juste en dessous du bouton
                                                setMenuPosition({
                                                    id: container.id,
                                                    x: rect.left,
                                                    y: rect.bottom + window.scrollY,
                                                });
                                            }}
                                            style={styles.menuButton}
                                        >
                                            ⋮
                                        </button>

                                        {/* Menu déroulant (hors du tableau) */}
                                        {menuPosition && menuPosition.id === container.id && (
                                            <div
                                                style={{
                                                    ...styles.menuDropdown,
                                                    top: `${menuPosition.y}px`,
                                                    left: `${menuPosition.x}px`,
                                                    zIndex: 1000,
                                                }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setEditingContainer(container);
                                                        setMenuPosition(null);
                                                    }}
                                                    style={styles.menuItem}
                                                >
                                                    ✏️ Modifier
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeleteConfirmId(container.id);
                                                        setMenuPosition(null);
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
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Ajouter un nouveau conteneur</h3>
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
                                <label style={styles.label}>Nom du conteneur</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Date de départ prévue</label>
                                <input
                                    type="date"
                                    name="departureDate"
                                    value={formData.departureDate || ''}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Date d'arrivée prévue</label>
                                <input
                                    type="date"
                                    name="arrivalDate"
                                    value={formData.arrivalDate || ''}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>État du chargement</label>
                                <select
                                    name="loadingStatus"
                                    value={formData.loadingStatus}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                >
                                    {Object.entries(LOADING_STATUS_LABELS).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>État du déchargement</label>
                                <select
                                    name="unloadingStatus"
                                    value={formData.unloadingStatus}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                >
                                    {Object.entries(UNLOADING_STATUS_LABELS).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
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
                        <p>Êtes-vous sûr de vouloir supprimer ce conteneur ? Cette action est irréversible.</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                style={styles.cancelButton}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={async () => {
                                    await deleteContainer(deleteConfirmId);
                                    setDeleteConfirmId(null);
                                }}
                                style={{ ...styles.addButton, padding: '8px 16px' }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal d'édition */}
            {editingContainer && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Modifier le conteneur</h3>
                            <button
                                onClick={() => setEditingContainer(null)}
                                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (!editingContainer) return;
                            try {
                                await updateContainer(editingContainer.id, editingContainer);
                                setEditingContainer(null);
                            } catch (err: any) {
                                alert(err.message);
                            }
                        }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Nom du conteneur</label>
                                <input
                                    type="text"
                                    value={editingContainer.name}
                                    onChange={(e) => setEditingContainer({ ...editingContainer, name: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Date de départ prévue</label>
                                <input
                                    type="date"
                                    value={editingContainer.departureDate || ''}
                                    onChange={(e) => setEditingContainer({ ...editingContainer, departureDate: e.target.value })}
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>Date d'arrivée prévue</label>
                                <input
                                    type="date"
                                    value={editingContainer.arrivalDate || ''}
                                    onChange={(e) => setEditingContainer({ ...editingContainer, arrivalDate: e.target.value })}
                                    style={styles.input}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>État du chargement</label>
                                <select
                                    value={editingContainer.loadingStatus}
                                    onChange={(e) => setEditingContainer({ ...editingContainer, loadingStatus: e.target.value as any })}
                                    style={styles.input}
                                >
                                    {Object.entries(LOADING_STATUS_LABELS).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={styles.label}>État du déchargement</label>
                                <select
                                    value={editingContainer.unloadingStatus}
                                    onChange={(e) => setEditingContainer({ ...editingContainer, unloadingStatus: e.target.value as any })}
                                    style={styles.input}
                                >
                                    {Object.entries(UNLOADING_STATUS_LABELS).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => setEditingContainer(null)}
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

// Styles identiques à ClientsPage.tsx
const styles = {

    menuButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '4px',
    } as const,

    menuDropdown: {
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