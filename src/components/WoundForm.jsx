import React, { useState } from 'react';

const WoundForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        ubicacion: '',
        tipo: '',
        estado: 'Activo'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ubicación de la Herida</label>
                <input
                    type="text"
                    name="ubicacion"
                    required
                    value={formData.ubicacion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Ej. Pierna derecha, zona tibial"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Herida</label>
                <select
                    name="tipo"
                    required
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                    <option value="">Seleccionar tipo...</option>
                    <option value="Úlcera Venosa">Úlcera Venosa</option>
                    <option value="Úlcera Arterial">Úlcera Arterial</option>
                    <option value="Pie Diabético">Pie Diabético</option>
                    <option value="Quemadura">Quemadura</option>
                    <option value="Quirúrgica">Quirúrgica</option>
                    <option value="Traumática">Traumática</option>
                    <option value="Otra">Otra</option>
                </select>
            </div>

            <div className="flex gap-3 mt-4 justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                    Registrar Herida
                </button>
            </div>
        </form>
    );
};

export default WoundForm;
