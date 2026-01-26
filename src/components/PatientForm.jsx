import React, { useState, useEffect } from 'react';
import { createPatient, updatePatient } from '../services/patientService';
import './PatientForm.css';

const PatientForm = ({ onPatientAdded, initialData }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        contacto: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load initial data if editing
    useEffect(() => {
        if (initialData) {
            // Format date to YYYY-MM-DD for input[type="date"]
            let formattedDate = '';
            if (initialData.fecha_nacimiento) {
                const date = new Date(initialData.fecha_nacimiento);
                formattedDate = date.toISOString().split('T')[0];
            }
            setFormData({
                nombre: initialData.nombre || '',
                apellido: initialData.apellido || '',
                fecha_nacimiento: formattedDate,
                contacto: initialData.contacto || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (initialData && initialData.id) {
                await updatePatient(initialData.id, formData);
            } else {
                await createPatient(formData);
            }

            setFormData({ nombre: '', apellido: '', fecha_nacimiento: '', contacto: '' });
            if (onPatientAdded) onPatientAdded();
        } catch (error) {
            console.error('Error al guardar paciente:', error);
            alert('Falló la operación.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="patient-form-card">
            <div className="patient-form-header">
                <h3>{initialData ? 'Editar Paciente' : 'Registrar Nuevo Paciente'}</h3>
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
                        {isSubmitting ? 'Guardando...' : (initialData ? 'Actualizar Paciente' : 'Registrar Paciente')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
