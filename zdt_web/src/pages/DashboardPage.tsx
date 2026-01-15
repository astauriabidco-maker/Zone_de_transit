// src/pages/DashboardPage.tsx
import React from 'react';
import {
    Box, TrendingUp, Users, FileText
} from 'lucide-react';

export default function DashboardPage() {
    const stats = [
        { icon: Box, value: '428', label: 'Conteneurs en mer', trend: '+12%', color: '#22c55e' },
        { icon: TrendingUp, value: '1.2M€', label: 'Ventes (30j)', trend: '+5.4%', color: '#22c55e' },
        { icon: Users, value: '1,842', label: 'Clients actifs', trend: 'Stable', color: '#94a3b8' },
        { icon: FileText, value: '14', label: 'Factures en retard', trend: 'Attention', color: '#ef4444' },
    ];

    const shipments = [
        { id: 'GP-8492', dest: 'Rotterdam, NL', client: 'Oceanic Corp', status: 'En mer', color: '#3b82f6' },
        { id: 'GP-2104', dest: 'Singapore, SG', client: 'TechLogistics', status: 'Chargement', color: '#f59e0b' },
        { id: 'GP-7731', dest: 'Marseille, FR', client: 'Vins de France', status: 'Livré', color: '#22c55e' },
        { id: 'GP-4420', dest: 'Dakar, SN', client: 'Sahel Trade', status: 'En mer', color: '#3b82f6' },
        { id: 'GP-1099', dest: 'Shanghai, CN', client: 'Global Tech', status: 'Transit', color: '#a855f7' },
        { id: 'GP-3321', dest: 'New York, US', client: 'Liberty Goods', status: 'Livré', color: '#22c55e' },
    ];

    return (
        <>
            <header style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Centre de Contrôle</h2>
                <p style={{ color: '#94a3b8' }}>Statut opérationnel : Nominal. Bienvenue sur votre terminal de gestion.</p>
            </header>

            {/* Stats */}
            <div style={styles.statsGrid}>
                {stats.map((stat, idx) => (
                    <div key={idx} style={styles.statCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <stat.icon color="#3b82f6" size={24} />
                            <span style={{ color: stat.color, fontSize: '12px', fontWeight: '600' }}>{stat.trend}</span>
                        </div>
                        <h4 style={{ fontSize: '24px', fontWeight: '700' }}>{stat.value}</h4>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Shipments Table */}
            <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Expéditions Récentes</h3>
                    <button style={{ fontSize: '12px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>Tout voir</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #1e293b', textAlign: 'left' }}>
                            <th style={styles.th}>ID CONTENEUR</th>
                            <th style={styles.th}>DESTINATION</th>
                            <th style={styles.th}>CLIENT</th>
                            <th style={styles.th}>STATUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((item, idx, arr) => (
                            <tr key={idx} style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #1e293b' }}>
                                <td style={{ padding: '16px 12px', fontWeight: '600' }}>{item.id}</td>
                                <td style={{ padding: '16px 12px', fontSize: '14px' }}>{item.dest}</td>
                                <td style={{ padding: '16px 12px', fontSize: '14px' }}>{item.client}</td>
                                <td style={{ padding: '16px 12px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        backgroundColor: `${item.color}20`,
                                        color: item.color,
                                        border: `1px solid ${item.color}40`
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const styles = {
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
    },
    statCard: {
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '20px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '12px',
    },
    card: {
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '20px',
        padding: '24px',
    },
    th: {
        padding: '12px',
        color: '#64748b',
        fontSize: '12px',
        textAlign: 'left' as const,
    },
};