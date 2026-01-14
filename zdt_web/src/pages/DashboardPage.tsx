// src/pages/DashboardPage.tsx

import React, { useState } from 'react';
import {
    Users, Box, BarChart3, FileText, Globe, Layout, UserCog,
    Search, Bell, LogOut, Truck, TrendingUp,
    Package, MessageSquare
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';


export type DashboardView = 'overview' | 'clients' | 'containers' | 'sales' | 'invoices' | 'website' | 'portal' | 'employees';


export default function DashboardPage() {
    const { user, logout } = useAuth(); // ← récupère l'utilisateur et la fonction de déconnexion
    const [activeView, setActiveView] = useState<DashboardView>('overview');

    const styles: Record<string, any> = {
        logoImage: {
            height: '90px', // ou width, selon vos besoins
            objectFit: 'contain' as const,
            marginLeft: '12px',
            marginBottom: '25px',
        } as const,

        layout: {
            display: 'flex',
            height: '100vh',
            backgroundColor: '#020617',
            color: '#f1f5f9',
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif',
        },
        sidebar: {
            width: '280px',
            backgroundColor: '#0f172a',
            borderRight: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 16px',
        },
        sidebarItem: (active: boolean): React.CSSProperties => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            backgroundColor: active ? '#2563eb' : 'transparent',
            color: active ? 'white' : '#94a3b8',
            transition: 'all 0.2s ease',
            marginBottom: '4px',
            fontWeight: active ? '600' : '400',
        }),
        main: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
        },
        topBar: {
            height: '72px',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(8px)',
        },
        content: {
            padding: '32px',
        },
        card: {
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '20px',
            padding: '24px',
        },
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
            flexDirection: 'column',
            gap: '12px',
        }
    };

    const menuItems = [
        { id: 'overview' as DashboardView, label: 'Vue d\'ensemble', icon: Layout },
        { id: 'clients' as DashboardView, label: 'Clients', icon: Users },
        { id: 'containers' as DashboardView, label: 'Conteneurs', icon: Box },
        { id: 'sales' as DashboardView, label: 'Ventes', icon: BarChart3 },
        { id: 'invoices' as DashboardView, label: 'Factures', icon: FileText },
        { id: 'website' as DashboardView, label: 'Site Web', icon: Globe },
        { id: 'portal' as DashboardView, label: 'Portal Client', icon: MessageSquare },
        { id: 'employees' as DashboardView, label: 'Employés', icon: UserCog },
    ];

    const renderOverview = () => (
        <div style={styles.content}>
            <header style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Centre de Contrôle</h2>
                <p style={{ color: '#94a3b8' }}>Statut opérationnel : Nominal. Bienvenue sur votre terminal de gestion.</p>
            </header>

            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box color="#3b82f6" size={24} />
                        <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600' }}>+12%</span>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '24px', fontWeight: '700' }}>428</h4>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Conteneurs en mer</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TrendingUp color="#3b82f6" size={24} />
                        <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600' }}>+5.4%</span>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '24px', fontWeight: '700' }}>1.2M€</h4>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Ventes (30j)</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Users color="#3b82f6" size={24} />
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Stable</span>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '24px', fontWeight: '700' }}>1,842</h4>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Clients actifs</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FileText color="#ef4444" size={24} />
                        <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600' }}>Attention</span>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '24px', fontWeight: '700' }}>14</h4>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Factures en retard</p>
                    </div>
                </div>
            </div>

            <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Expéditions Récentes</h3>
                    <button style={{ fontSize: '12px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>Tout voir</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #1e293b', textAlign: 'left' }}>
                            <th style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>ID CONTENEUR</th>
                            <th style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>DESTINATION</th>
                            <th style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>CLIENT</th>
                            <th style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>STATUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 'GP-8492', dest: 'Rotterdam, NL', client: 'Oceanic Corp', status: 'En mer', color: '#3b82f6' },
                            { id: 'GP-2104', dest: 'Singapore, SG', client: 'TechLogistics', status: 'Chargement', color: '#f59e0b' },
                            { id: 'GP-7731', dest: 'Marseille, FR', client: 'Vins de France', status: 'Livré', color: '#22c55e' },
                            { id: 'GP-4420', dest: 'Dakar, SN', client: 'Sahel Trade', status: 'En mer', color: '#3b82f6' },
                            { id: 'GP-1099', dest: 'Shanghai, CN', client: 'Global Tech', status: 'Transit', color: '#a855f7' },
                            { id: 'GP-3321', dest: 'New York, US', client: 'Liberty Goods', status: 'Livré', color: '#22c55e' },
                        ].map((item, idx, arr) => (
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
        </div>
    );

    return (
        <div style={styles.layout}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.logoImage}>
                    <img
                        src="/logos/logo.png"
                        alt="Zone de Transit Logo"
                        style={styles.logoImage}
                    />
                </div>

                <nav style={{ flex: 1 }}>
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            style={styles.sidebarItem(activeView === item.id)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div
                    onClick={logout}
                    style={{ ...styles.sidebarItem(false), marginTop: 'auto', color: '#ef4444' }}
                >
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                </div>
            </aside>

            {/* Main Area */}
            <main style={styles.main}>
                <header style={styles.topBar}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            style={{ width: '100%', padding: '10px 10px 10px 40px', backgroundColor: '#1e293b', border: 'none', borderRadius: '10px', color: 'white', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <Bell size={22} color="#94a3b8" />
                            <div style={{ position: 'absolute', top: '0', right: '0', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #0f172a' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #1e293b', paddingLeft: '24px' }}>
                            <div style={{ textAlign: 'right' }}>
                                {/* <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>Logistics Admin</p> */}
                                <p style={{ fontSize: '12px', color: '#ffff', margin: 0 }}>{user?.firstName}</p>
                            </div>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                                <span style={{ margin: 'auto' }}>
                                    {user?.firstName.charAt(0).toUpperCase() || 'U'}

                                    {user?.lastName.charAt(0).toUpperCase() || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {activeView === 'overview' ? renderOverview() : (
                    <div style={styles.content}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Section {activeView.toUpperCase()}</h2>
                        <p style={{ color: '#94a3b8' }}>Cette fonctionnalité est en cours de déploiement pour la version 2.0.</p>
                        <div style={{ ...styles.card, marginTop: '24px', textAlign: 'center', padding: '60px' }}>
                            <Package size={48} color="#1e293b" style={{ margin: '0 auto 24px' }} />
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Interface en préparation</h3>
                            <p style={{ color: '#64748b' }}>Accès restreint temporairement pour maintenance opérationnelle.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
