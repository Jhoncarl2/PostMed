import { useNavigate } from 'react-router-dom';
import './PatientCard.css';

const PatientCards = ({ patients }) => {
    const navigate = useNavigate();

    if (!patients || patients.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>No hay pacientes registrados aún.</p>
            </div>
        );
    }

    return (
        <div className="patient-card-grid">
            {patients.map(patient => {
                const initials = ((patient.nombre?.[0] || '') + (patient.apellido?.[0] || '')).toUpperCase();
                const dob = patient.fecha_nacimiento ? new Date(patient.fecha_nacimiento).toLocaleDateString() : 'N/A';

                return (
                    <div key={patient.id} className="patient-card">
                        <div className="card-header">
                            <div className="card-avatar">
                                {initials}
                            </div>
                            <div className="card-info">
                                <h3>{patient.nombre} {patient.apellido}</h3>
                                <span className="card-id">ID: #{patient.id.toString().padStart(4, '0')}</span>
                            </div>
                        </div>

                        <div className="card-divider"></div>

                        <div className="card-details">
                            <div className="detail-item">
                                <span className="detail-label">Nacimiento</span>
                                <span className="detail-value">{dob}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Contacto</span>
                                <span className="detail-value">{patient.contacto || '-'}</span>
                            </div>
                        </div>

                        <div className="card-actions">
                            <button
                                className="action-btn btn-view"
                                onClick={() => navigate(`/dashboard/pacientes/${patient.id}`)}
                            >
                                Ver Expediente →
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PatientCards;
