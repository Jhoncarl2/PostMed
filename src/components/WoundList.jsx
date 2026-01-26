import React from 'react';

const WoundList = ({ wounds }) => {
    if (!wounds || wounds.length === 0) {
        return (
            <div className="text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 mb-2">No hay heridas registradas.</p>
                <p className="text-sm text-slate-400">Haz clic en "Nueva Herida" para comenzar el seguimiento.</p>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'activo': return 'bg-red-100 text-red-600 border-red-200';
            case 'sanado': return 'bg-green-100 text-green-600 border-green-200';
            case 'en tratamiento': return 'bg-blue-100 text-blue-600 border-blue-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wounds.map((wound) => (
                <div key={wound.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(wound.estado)}`}>
                            {wound.estado || 'Activo'}
                        </div>
                        <span className="text-xs text-slate-400">
                            {new Date(wound.creado_en).toLocaleDateString()}
                        </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-lg mb-1">{wound.ubicacion}</h3>
                    <p className="text-slate-500 text-sm mb-4">{wound.tipo}</p>

                    <div className="flex justify-end">
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                            Ver Evaluaciones →
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WoundList;
