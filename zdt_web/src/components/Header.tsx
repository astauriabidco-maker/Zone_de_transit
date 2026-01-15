// src/components/Header.tsx
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
    onSearchChange: (value: string) => void;
}

export default function Header({ onSearchChange }: HeaderProps) {
    const { user } = useAuth();

    return (
        <header style={styles.topBar}>
            <div style={{ position: 'relative', width: '300px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                    type="text"
                    placeholder="Rechercher..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 10px 10px 40px',
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '14px',
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <Bell size={22} color="#94a3b8" />
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#ef4444',
                        borderRadius: '50%',
                        border: '2px solid #0f172a'
                    }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #1e293b', paddingLeft: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '12px', color: '#ffff', margin: 0 }}>
                            {user?.firstName}
                        </p>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        backgroundColor: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        color: 'white'
                    }}>
                        {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                        {user?.lastName?.charAt(0).toUpperCase() || ''}
                    </div>
                </div>
            </div>
        </header>
    );
}

const styles = {
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
};