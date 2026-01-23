const API_URL = 'http://localhost:5000/api';

export const getPatients = async () => {
    const response = await fetch(`${API_URL}/pacientes`);
    if (!response.ok) {
        throw new Error('Failed to fetch patients');
    }
    return response.json();
};

export const getPatientById = async (id) => {
    const response = await fetch(`${API_URL}/pacientes/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch patient details');
    }
    return response.json();
};

export const createPatient = async (patientData) => {
    const response = await fetch(`${API_URL}/pacientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    });
    if (!response.ok) {
        throw new Error('Failed to create patient');
    }
    return response.json();
};
