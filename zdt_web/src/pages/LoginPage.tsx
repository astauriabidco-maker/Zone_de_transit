// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            if (rememberMe) {
                // Stockage local du token (optionnel, mais non recommandé en prod)
                // En prod, utiliser des cookies HTTP-only
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || "Email ou mot de passe incorrect.");
        }
    };

    return (
        <div style={styles.container}>
            {/* Colonne gauche : branding */}

            <div style={styles.leftPanel}>
                <div style={styles.logoContainer}>
                    <img
                        src="/logos/logo.png"
                        alt="Zone de Transit Logo"
                        style={styles.logoImage}
                    />
                </div>

                <div style={styles.heroText}>
                    <h2 style={styles.heroTitle}>
                        Connecter le monde,<br /><span style={{ color: '#60a5fa' }}>une livraison à la fois.</span>
                    </h2>
                    <p style={styles.description}>
                        Notre technologie de pointe assure la fluidité de vos opérations de transport de la France au Cameroun, avec une précision et une sécurité inégalée.
                    </p>
                </div>

                <div style={styles.iconsRow}>
                    {[
                        { name: 'Maritime', icon: '⚓' },
                    ].map((item, index) => (
                        <div key={index} style={styles.iconBox}>
                            <div style={styles.icon}>{item.icon}</div>
                            <div style={styles.iconLabel}>{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Colonne droite : formulaire */}
            <div style={styles.rightPanel}>
                <div style={styles.formContainer}>
                    <h2 style={styles.title}>Bon retour</h2>
                    <p style={styles.subtitle}>Accédez à votre tableau de bord logistique.</p>

                    {error && <div style={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Adresse Email</label>
                            <div style={styles.inputWrapper}>
                                <Mail size={20} style={styles.iconPrefix} />
                                <input
                                    type="email"
                                    placeholder="****@zonedetransit.fr"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Mot de passe</label>
                            <div style={styles.inputWrapper}>
                                <Lock size={20} style={styles.iconPrefix} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.passwordToggle}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div style={styles.rememberRow}>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    style={styles.checkbox}
                                />
                                <label htmlFor="remember-me" style={{ fontSize: '14px', color: '#94a3b8' }}>
                                    Se souvenir de moi
                                </label>
                            </label>
                            <a href="#" style={styles.forgotLink}>Mot de passe oublié ?</a>
                        </div>

                        <button
                            type="submit"
                            style={styles.loginButton}
                        >
                            Se connecter
                        </button>
                    </form>

                    <div style={styles.footer}>
                        Besoin d'aide ? <a href="#" style={styles.supportLink}>Contactez le support IT</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    passwordToggle: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
    } as const,

    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#cbd5e1',
        marginBottom: '8px',
    } as const,

    heroTitle: {
        fontSize: '40px',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '24px',
        lineHeight: 1.1,
    } as const,

    logoImage: {
        height: '120px', // ou width, selon vos besoins
        objectFit: 'contain' as const,
    },

    title: {
        fontSize: '30px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '8px',
    },

    subtitle: {
        fontSize: '16px',
        color: '#94a3b8',
        marginBottom: '24px',
    } as const,

    container: {
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    } as const,

    leftPanel: {
        flex: 1,
        background: 'linear-gradient(135deg, #1a2a4f, #0d162c)',
        color: 'white',
        padding: '40px 60px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between' as const,
    } as const,

    rightPanel: {
        flex: 1,
        background: '#0a0a12',
        display: 'flex',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    } as const,

    logoContainer: {
        display: 'flex',
        alignItems: 'center' as const,
        gap: '10px',
        marginBottom: '40px',
    } as const,

    logoIcon: {
        fontSize: '28px',
        backgroundColor: '#1e88e5',
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        color: 'white',
    } as const,

    logoText: {
        display: 'flex',
        flexDirection: 'column' as const,
    } as const,

    companyName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
    } as const,

    tagline: {
        fontSize: '12px',
        opacity: 0.8,
    } as const,

    heroText: {
        position: 'relative',
        zIndex: 10,
        maxWidth: '512px',
    } as const,

    highlight: {
        color: '#1e88e5',
    } as const,

    description: {
        fontSize: '18px',
        color: '#cbd5e1',
        marginBottom: '32px',
        lineHeight: 1.6,
    } as const,

    iconsRow: {
        display: 'flex',
        gap: '20px',
        marginTop: '40px',
    } as const,

    iconBox: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        textAlign: 'center' as const,
    } as const,

    icon: {
        fontSize: '24px',
        marginBottom: '8px',
    } as const,

    iconLabel: {
        fontSize: '12px',
        opacity: 0.8,
    } as const,

    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        background: '#12121a',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    } as const,

    form: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        gap: '20px' as const,
    } as const,

    inputGroup: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        gap: '8px' as const,
    } as const,

    inputWrapper: {
        position: 'relative' as const,
        display: 'flex' as const,
        alignItems: 'center' as const,
    } as const,

    iconPrefix: {
        position: 'absolute' as const,
        left: '12px' as const,
        color: '#aaa' as const,
        fontSize: '16px' as const,
    } as const,

    eyeIcon: {
        position: 'absolute' as const,
        right: '12px' as const,
        color: '#aaa' as const,
        fontSize: '16px' as const,
        cursor: 'pointer' as const,
    } as const,

    input: {
        width: '100%' as const,
        padding: '12px 12px 12px 40px' as const,
        border: '1px solid #333' as const,
        borderRadius: '8px' as const,
        backgroundColor: '#1e1e2a' as const,
        color: 'white' as const,
        fontSize: '14px' as const,
        outline: 'none' as const,
        transition: 'border-color 0.2s' as const,
    } as const,

    inputFocus: {
        borderColor: '#1e88e5' as const,
    } as const,

    rememberRow: {
        display: 'flex' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
        fontSize: '14px' as const,
    } as const,

    checkbox: {
        marginRight: '8px' as const,
        accentColor: '#1e88e5' as const,
    } as const,

    checkboxLabel: {
        display: 'flex' as const,
        alignItems: 'center' as const,
        cursor: 'pointer' as const,
    } as const,

    forgotLink: {
        color: '#1e88e5' as const,
        textDecoration: 'none' as const,
        fontSize: '14px' as const,
        cursor: 'pointer' as const,
    } as const,

    loginButton: {
        width: '100%' as const,
        padding: '12px' as const,
        backgroundColor: '#1e88e5' as const,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    } as const,

    loginButtonHover: {
        backgroundColor: '#1976d2',
    } as const,

    error: {
        color: 'red' as const,
        textAlign: 'center' as const,
        marginBottom: '12px' as const,
        fontSize: '14px' as const,
    } as const,

    footer: {
        marginTop: '20px' as const,
        textAlign: 'center' as const,
        fontSize: '12px' as const,
        color: '#aaa' as const,
    } as const,

    supportLink: {
        color: '#1e88e5' as const,
        textDecoration: 'none' as const,
        fontWeight: 'bold' as const,
    } as const,
};