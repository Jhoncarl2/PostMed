import React, { useRef, useState, useEffect } from 'react';
import PatientGrid from '../components/PatientGrid';
import PatientCards from '../components/PatientCards';
import PatientForm from '../components/PatientForm';
import Modal from '../components/Modal';
import { getPatients } from '../services/patientService';

const PatientsPage = () => {
    const gridRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('cards'); // Default to 'cards' for visual appeal
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPatientsData = async () => {
        setLoading(true);
        try {
            const data = await getPatients();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatientsData();
    }, []);

    const handlePatientAdded = () => {
        loadPatientsData(); // Refresh local data
        if (gridRef.current) {
            gridRef.current.loadPatients(); // Also refresh grid if active
        }
        setIsModalOpen(false);
    };

    return (
        <div className="patients-page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Gestión de Pacientes</h2>

                    {/* View Toggles */}
                    <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '8px', padding: '4px' }}>
                        <button
                            onClick={() => setViewMode('cards')}
                            style={{
                                background: viewMode === 'cards' ? 'white' : 'transparent',
                                border: 'none', padding: '6px 10px', borderRadius: '6px',
                                boxShadow: viewMode === 'cards' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                cursor: 'pointer', transition: 'all 0.2s', fontSize: '1.1rem'
                            }}
                            title="Vista de Tarjetas"
                        >
                            📱
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            style={{
                                background: viewMode === 'grid' ? 'white' : 'transparent',
                                border: 'none', padding: '6px 10px', borderRadius: '6px',
                                boxShadow: viewMode === 'grid' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                cursor: 'pointer', transition: 'all 0.2s', fontSize: '1.1rem'
                            }}
                            title="Vista de Tabla"
                        >
                            📋
                        </button>
                    </div>
                </div>

                <button
                    className="btn-primary"
                    onClick={() => setIsModalOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <span>+</span> Nuevo Paciente
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registrar Nuevo Paciente"
            >
                <PatientForm onPatientAdded={handlePatientAdded} />
            </Modal>

            <div style={{ marginTop: '20px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Cargando pacientes...</div>
                ) : (
                    viewMode === 'cards' ? (
                        <PatientCards patients={patients} />
                    ) : (
                        <PatientGrid ref={gridRef} />
                    )
                )}
            </div>
        </div>
    );
};

export default PatientsPage;
