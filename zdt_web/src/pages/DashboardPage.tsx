// src/pages/DashboardPage.tsx
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Tableau de bord</h1>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Déconnexion
                </button>
            </header>
            <main style={styles.main}>
                <h2>Bienvenue, {user.firstName} {user.lastName} !</h2>
                <p><strong>Rôle :</strong> {user.role}</p>
                <p><strong>Email :</strong> {user.email}</p>
                {/* Ici, tu ajouteras la liste des colis, scan, etc. */}
                <div style={styles.placeholder}>
                    📦 Prochaines actions : scanner les colis à livrer
                </div>
            </main>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    main: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
    },
    logoutButton: {
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    placeholder: {
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px dashed #ccc',
        textAlign: 'center' as const,
    },
};