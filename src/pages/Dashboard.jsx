import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import PatientDetail from '../pages/PatientDetail';
import PatientsPage from '../pages/PatientsPage';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentDate, setCurrentDate] = React.useState(new Date());

    // Check if we are on the root dashboard (Overview)
    const isRootDashboard = location.pathname === '/dashboard';

    // Helper for active link styles
    const isActive = (path) => location.pathname === path ? 'nav-item active' : 'nav-item';

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
                {/* Dynamically show Top Bar ONLY on root dashboard */}
                {isRootDashboard && (
                    <header className="top-bar animate-fade-in">
                        <div className="top-bar-left">
                            <h3>Panel de Control</h3>
                        </div>
                        <div className="greeting-date">
                            {currentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </header>
                )}

                <div className="content-area">
                    <div key={location.pathname} className="page-transition">
                        <Routes>
                            <Route path="/" element={
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100">
                                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido, {user?.nombre}</h2>
                                    <p className="text-slate-500 mb-8 text-lg">Resumen de actividad reciente en tu clínica.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <span className="text-6xl">👥</span>
                                            </div>
                                            <h3 className="text-4xl font-bold text-blue-700 mb-1">12</h3>
                                            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Pacientes Activos</span>
                                        </div>

                                        <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <span className="text-6xl">🩹</span>
                                            </div>
                                            <h3 className="text-4xl font-bold text-emerald-700 mb-1">5</h3>
                                            <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase">Nuevas Heridas</span>
                                        </div>

                                        <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 border border-red-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <span className="text-6xl">⚠️</span>
                                            </div>
                                            <h3 className="text-4xl font-bold text-red-700 mb-1">2</h3>
                                            <span className="text-sm font-semibold text-red-600 tracking-wider uppercase">Alertas Médicas</span>
                                        </div>
                                    </div>
                                </div>
                            } />
                            <Route path="pacientes" element={<PatientsPage />} />
                            <Route path="pacientes/:id" element={<PatientDetail />} />
                            <Route path="heridas" element={
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    <div className="text-center">
                                        <span className="text-6xl mb-4 block">🚧</span>
                                        <h3 className="text-xl font-medium">Módulo de Heridas en Construcción</h3>
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
