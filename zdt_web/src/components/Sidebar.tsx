// src/components/Sidebar.tsx
import React from 'react';
import {
    Layout, Users, Box, BarChart3, FileText,
    Globe, MessageSquare, UserCog, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type DashboardView = 'overview' | 'clients' | 'containers' | 'sales' | 'invoices' | 'website' | 'portal' | 'employees';

interface SidebarProps {
    activeView: DashboardView;
}

const menuItems: { id: DashboardView; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Layout },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'containers', label: 'Conteneurs', icon: Box },
    { id: 'sales', label: 'Ventes', icon: BarChart3 },
    { id: 'invoices', label: 'Factures', icon: FileText },
    { id: 'website', label: 'Site Web', icon: Globe },
    { id: 'portal', label: 'Portal Client', icon: MessageSquare },
    { id: 'employees', label: 'Employés', icon: UserCog },
];

export default function Sidebar({ activeView }: SidebarProps) {
    const navigate = useNavigate();

    const handleNavigate = (view: DashboardView) => {
        const routeMap: Record<DashboardView, string> = {
            overview: '/dashboard',
            clients: '/clients',
            containers: '/containers',
            sales: '/sales',
            invoices: '/invoices',
            website: '/website',
            portal: '/portal',
            employees: '/employees',
        };
        navigate(routeMap[view]);
    };

    return (
        <aside style={styles.sidebar}>
            <div style={styles.logoImage}>
                <img
                    src="/logos/logo.png"
                    alt="GlobalPath Logo"
                    style={styles.logoImage}
                />
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        style={styles.sidebarItem(activeView === item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div
                onClick={() => navigate('/login')}
                style={{ ...styles.sidebarItem(false), marginTop: 'auto', color: '#ef4444' }}
            >
                <LogOut size={20} />
                <span>Déconnexion</span>
            </div>
        </aside>
    );
}

const styles = {
    logoImage: {
        height: '90px',
        objectFit: 'contain' as const,
        marginLeft: '12px',
        marginBottom: '25px',
    },
    sidebar: {
        width: '280px',
        backgroundColor: '#0f172a',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column' as const,
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
        fontWeight: active ? '600' as const : '400' as const,
    }),
};