// src/pages/ClientsPage.tsx
import React from 'react';

export default function ClientsPage() {
    const clients = [
        { id: 1, name: 'Alice Mbarga', email: 'alice.m@gmail.com', activeParcels: 4, lastOperation: '12/10/2023' },
        { id: 2, name: 'Entreprise Sadi', email: 'contact@sadi.cm', activeParcels: 22, lastOperation: '14/10/2023' },
        { id: 3, name: 'Paul Atangana', email: 'paul.ata@yahoo.fr', activeParcels: 1, lastOperation: '01/10/2023' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>Gestion des Clients</h3>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                    <button style={styles.exportButton}>Exporter PDF</button>
                    <button style={styles.addButton}>+ Ajouter</button>
                </div>
            </div>

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
                                <td style={styles.td}>{client.name}</td>
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
        </div>
    );
}

// Styles spécifiques à la page Clients
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
};