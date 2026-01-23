import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser({ email, password });
            onLogin(user);
        } catch (err) {
            setError('Credenciales incorrectas. Verifique su email y contraseña.');
        }
    };

    return (
        <div className="login-container">
            {/* Left Side: Brand Hero */}
            <div className="login-hero">
                <div className="hero-content">
                    <div className="brand-showcase">
                        <div className="brand-logo-large">+</div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '1px' }}>POSTMED</span>
                    </div>
                    <h1>Gestión Médica<br />Inteligente y Segura.</h1>
                    <p>
                        Optimiza el seguimiento de pacientes y evaluación de heridas con nuestra plataforma integral.
                        Diseñada para profesionales de la salud.
                    </p>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="login-form-wrapper">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Bienvenido de nuevo</h2>
                        <p>Ingresa tus credenciales para acceder al panel.</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="nombre@hospital.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="login-btn-primary">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
