import React, { useRef, useState, useEffect } from 'react';
import PatientGrid from '../components/PatientGrid';
import PatientCards from '../components/PatientCards';
import PatientForm from '../components/PatientForm';
import Modal from '../components/Modal';
import { getPatients, deletePatient } from '../services/patientService';
import PatientFilters from '../components/PatientFilters';

const PatientsPage = () => {
    const gridRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('cards'); // Default to 'cards' for visual appeal
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPatient, setEditingPatient] = useState(null);

    const loadPatientsData = async () => {
        setLoading(true);
        try {
            const data = await getPatients();
            setPatients(data);
            setFilteredPatients(data); // Initialize filtered data
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
        setIsModalOpen(false);
        setEditingPatient(null);
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setIsModalOpen(true);
    };

    const handleDelete = async (patient) => {
        if (window.confirm(`¿Estás seguro de eliminar al paciente ${patient.nombre} ${patient.apellido}? Esta acción no se puede deshacer.`)) {
            try {
                await deletePatient(patient.id);
                loadPatientsData();
            } catch (error) {
                console.error("Error deleting patient:", error);
                alert("Error al eliminar paciente. Intente nuevamente.");
            }
        }
    };

    const handleFilterChange = ({ text, dateRange }) => {
        let result = [...patients];

        // Text Filter
        if (text) {
            const lowerText = text.toLowerCase();
            result = result.filter(p =>
                (p.nombre + ' ' + p.apellido).toLowerCase().includes(lowerText) ||
                (p.id && p.id.toString().includes(lowerText))
            );
        }

        // Date Range Filter
        if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
            const startDate = new Date(dateRange[0]);
            const endDate = new Date(dateRange[1]);
            // Reset hours to compare dates only effectively
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            result = result.filter(p => {
                if (!p.creado_en) return false;
                const regDate = new Date(p.creado_en);
                return regDate >= startDate && regDate <= endDate;
            });
        }

        setFilteredPatients(result);
    };

    const openNewPatientModal = () => {
        setEditingPatient(null);
        setIsModalOpen(true);
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
                    onClick={openNewPatientModal}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <span>+</span> Nuevo Paciente
                </button>
            </div>

            {/* Advanced Filters */}
            <PatientFilters onFilterChange={handleFilterChange} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPatient ? "Editar Paciente" : "Registrar Nuevo Paciente"}
            >
                <PatientForm
                    onPatientAdded={handlePatientAdded}
                    initialData={editingPatient}
                />
            </Modal>

            <div style={{ marginTop: '20px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Cargando pacientes...</div>
                ) : (
                    viewMode === 'cards' ? (
                        <PatientCards patients={filteredPatients} />
                    ) : (
                        <PatientGrid
                            ref={gridRef}
                            patients={filteredPatients}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default PatientsPage;
