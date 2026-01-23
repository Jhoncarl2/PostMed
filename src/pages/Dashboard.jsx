import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PatientDetail from '../pages/PatientDetail';
import PatientsPage from '../pages/PatientsPage';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = React.useState(new Date());

    // Simple active link check (can be improved with useLocation)
    const isActive = (path) => window.location.pathname === path ? 'nav-item active' : 'nav-item';

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">+</div>
                    <h2>PostMed</h2>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className={isActive('/dashboard')}>
                        <span className="nav-icon">📊</span> Resumen
                    </Link>
                    <Link to="/dashboard/pacientes" className={isActive('/dashboard/pacientes')}>
                        <span className="nav-icon">👥</span> Pacientes
                    </Link>
                    <Link to="/dashboard/heridas" className={isActive('/dashboard/heridas')}>
                        <span className="nav-icon">🩹</span> Heridas
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile-card">
                        <div className="avatar-circle">
                            {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="user-info-text">
                            <span className="user-name">{user?.nombre || 'Usuario'}</span>
                            <span className="user-role">Administrador</span>
                        </div>
                    </div>
                    <button onClick={onLogout} className="logout-btn">
                        <span style={{ marginRight: '8px' }}>🚪</span> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <div className="top-bar-left">
                        <h3>Panel de Control</h3>
                    </div>
                    <div className="greeting-date">
                        {currentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                <div className="content-area">
                    <Routes>
                        <Route path="/" element={
                            <div style={{ padding: '20px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                                <h2 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Bienvenido, {user?.nombre}</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>Resumen de actividad reciente.</p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
                                    <div style={{ background: '#eff6ff', padding: '25px', borderRadius: '16px', color: '#1e40af', border: '1px solid #dbeafe', transition: 'transform 0.2s', cursor: 'pointer' }} className="stat-card">
                                        <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700 }}>12</h3>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8 }}>PACIENTES ACTIVOS</span>
                                    </div>
                                    <div style={{ background: '#f0fdf4', padding: '25px', borderRadius: '16px', color: '#166534', border: '1px solid #dcfce7', transition: 'transform 0.2s', cursor: 'pointer' }} className="stat-card">
                                        <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700 }}>5</h3>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8 }}>NUEVAS HERIDAS</span>
                                    </div>
                                    <div style={{ background: '#fef2f2', padding: '25px', borderRadius: '16px', color: '#991b1b', border: '1px solid #fee2e2', transition: 'transform 0.2s', cursor: 'pointer' }} className="stat-card">
                                        <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700 }}>2</h3>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8 }}>ALERTAS MÉDICAS</span>
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="pacientes" element={<PatientsPage />} />
                        <Route path="pacientes/:id" element={<PatientDetail />} />
                        <Route path="heridas" element={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--secondary-color)' }}><h3>🩹 Módulo de Heridas en Construcción</h3></div>} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
