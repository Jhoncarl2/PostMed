import React, { useState, useEffect } from 'react';
import { createPatient } from '../services/patientService';
import './PatientForm.css';

const PatientForm = ({ onPatientAdded }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        contacto: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createPatient(formData);
            // alert('Paciente creado con éxito!'); // Use proper UI notification if possible, otherwise keep simple for now
            setFormData({ nombre: '', apellido: '', fecha_nacimiento: '', contacto: '' });
            if (onPatientAdded) onPatientAdded();
        } catch (error) {
            console.error('Error al crear paciente:', error);
            alert('Falló la creación del paciente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Keyboard Shortcut: Ctrl+S to Submit
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                // Check if form is valid (simple check)
                if (formData.nombre && formData.apellido) {
                    // Trigger submit manually since we can't easily access the event object here in a clean way for handleSubmit without refactoring
                    // Instead, we'll create a synthetic event or just call the logic.
                    // Ideally, use a ref for the button or form.
                    const submitBtn = document.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [formData]);

    return (
        <div className="patient-form-card">
            <div className="patient-form-header">
                <h3>Registrar Nuevo Paciente</h3>
            </div>
            <form onSubmit={handleSubmit} className="patient-form-grid">
                <div className="form-field">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        className="form-input"
                        placeholder="Ej. Juan"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        className="form-input"
                        placeholder="Ej. Pérez"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                    <input
                        id="fecha_nacimiento"
                        type="date"
                        name="fecha_nacimiento"
                        className="form-input"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field full-width">
                    <label htmlFor="contacto">Información de Contacto</label>
                    <textarea
                        id="contacto"
                        name="contacto"
                        className="form-textarea"
                        placeholder="Teléfono, Dirección, Email..."
                        value={formData.contacto}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Registrar Paciente'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
