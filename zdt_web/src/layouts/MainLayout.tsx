// src/layouts/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export type DashboardView = 'overview' | 'clients' | 'containers' | 'sales' | 'invoices' | 'website' | 'portal' | 'employees';

// Mappez les routes à leur vue active
const routeToView: Record<string, DashboardView> = {
    '/dashboard': 'overview',
    '/clients': 'clients',
    '/containers': 'containers',
    '/sales': 'sales',
    '/invoices': 'invoices',
    '/website': 'website',
    '/portal': 'portal',
    '/employees': 'employees',
};

export default function MainLayout() {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    // Détermine la vue active selon l'URL
    const activeView = routeToView[location.pathname] || 'overview';

    return (
        <div style={styles.layout}>
            <Sidebar activeView={activeView} />
            <div style={styles.main}>
                <Header onSearchChange={setSearchTerm} />
                <div style={styles.content}>
                    <Outlet /> {/* ← Contenu de la page enfant */}
                </div>
            </div>
        </div>
    );
}

const styles = {
    layout: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#020617',
        color: '#f1f5f9',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    },
    content: {
        padding: '32px',
        flexGrow: 1,
    },
};