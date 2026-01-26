import React, { useState } from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import '@syncfusion/ej2-react-calendars/styles/tailwind.css';

const PatientFilters = ({ onFilterChange }) => {
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState(null);

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        onFilterChange({ text, dateRange });
    };

    const handleDateChange = (args) => {
        setDateRange(args.value);
        onFilterChange({ text: searchText, dateRange: args.value });
    };

    const clearFilters = () => {
        setSearchText('');
        setDateRange(null);
        onFilterChange({ text: '', dateRange: null });
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                    placeholder="Buscar por nombre, apellido o ID..."
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Date Range & Actions */}
            <div className="flex w-full md:w-auto gap-3 items-center">
                <div className="w-full md:w-64 custom-datepicker-wrapper">
                    <DateRangePickerComponent
                        placeholder="Filtrar por Fecha"
                        change={handleDateChange}
                        value={dateRange}
                        cssClass="e-custom-range"
                        format="dd/MM/yyyy"
                    />
                </div>

                {(searchText || dateRange) && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center gap-2"
                    >
                        <span>✕</span>
                        <span className="hidden sm:inline">Limpiar</span>
                    </button>
                )}
            </div>

            <style>{`
                .custom-datepicker-wrapper .e-input-group {
                    border-radius: 0.75rem; /* rounded-xl */
                    border-color: #e2e8f0; /* slate-200 */
                    background-color: #f8fafc; /* slate-50 */
                    padding: 4px 0;
                }
                .custom-datepicker-wrapper .e-input-group:hover {
                    background-color: #fff;
                }
                .custom-datepicker-wrapper .e-input-group.e-input-focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                }
                .custom-datepicker-wrapper .e-date-range-icon {
                    color: #64748b; /* slate-500 */
                }
            `}</style>
        </div>
    );
};

export default PatientFilters;
