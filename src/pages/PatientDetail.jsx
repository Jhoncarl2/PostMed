import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, getWounds, createWound } from '../services/patientService';
import WoundList from '../components/WoundList';
import WoundForm from '../components/WoundForm';
import Modal from '../components/Modal';
import './PatientDetail.css';

const PatientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [wounds, setWounds] = useState([]);
    const [isWoundModalOpen, setIsWoundModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientData, woundsData] = await Promise.all([
                    getPatientById(id),
                    getWounds(id)
                ]);
                setPatient(patientData);
                setWounds(woundsData);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="detail-loading">Cargando expediente...</div>;
    if (!patient) return <div className="detail-error">Paciente no encontrado</div>;

    const initials = ((patient.nombre?.[0] || '') + (patient.apellido?.[0] || '')).toUpperCase();

    const handleWoundAdded = async (woundData) => {
        try {
            await createWound({ ...woundData, paciente_id: id });
            // Refresh wounds
            const updatedWounds = await getWounds(id);
            setWounds(updatedWounds);
            setIsWoundModalOpen(false);
        } catch (error) {
            console.error("Error creating wound:", error);
        }
    };

    return (
        <div className="patient-detail-container">
            <button className="back-btn" onClick={() => navigate('/dashboard/pacientes')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver a la lista
            </button>

            <div className="detail-header-card">
                <div className="detail-avatar-large">
                    {initials}
                </div>
                <div className="detail-info-primary">
                    <h1>{patient.nombre} {patient.apellido}</h1>
                    <span className="detail-id">ID: #{patient.id}</span>
                    <div className="detail-badges">
                        <span className="badge badge-active">Activo</span>
                    </div>
                </div>
                <div className="detail-actions">
                    <button className="btn-secondary">
                        <span style={{ fontSize: '1.1rem' }}>✎</span> Editar Datos
                    </button>
                    <button className="btn-primary">
                        <span style={{ fontSize: '1.1rem' }}>+</span> Nueva Evaluación
                    </button>
                </div>
            </div>

            <div className="detail-grid">
                <div className="detail-section info-section">
                    <h3>Información Personal</h3>
                    <div className="info-row">
                        <label>Fecha de Nacimiento:</label>
                        <span>{new Date(patient.fecha_nacimiento).toLocaleDateString()}</span>
                    </div>
                    <div className="info-row">
                        <label>Contacto:</label>
                        <span>{patient.contacto || 'No registrado'}</span>
                    </div>
                    <div className="info-row">
                        <label>Registrado el:</label>
                        <span>{new Date(patient.creado_en).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="detail-section wounds-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>Heridas Activas</h3>
                        <button
                            className="btn-primary"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                            onClick={() => setIsWoundModalOpen(true)}
                        >
                            + Nueva Herida
                        </button>
                    </div>

                    <WoundList wounds={wounds} />
                </div>
            </div>

            <Modal
                isOpen={isWoundModalOpen}
                onClose={() => setIsWoundModalOpen(false)}
                title="Registrar Nueva Herida"
            >
                <WoundForm
                    onSubmit={handleWoundAdded}
                    onCancel={() => setIsWoundModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default PatientDetail;
