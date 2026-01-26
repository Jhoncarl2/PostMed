
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { getPatients } from '../services/patientService';


import { useNavigate } from 'react-router-dom';

const PatientGrid = forwardRef(({ patients }, ref) => {
    // const [data, setData] = useState([]); // Removed internal state

    // useEffect(() => {
    //     loadPatients();
    // }, []); // Removed internal fetch

    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        // loadPatients // Removed exposed method as data is now controlled by parent
        refresh: () => {
            // gridRef.current.refresh(); // handled by prop change usually
        }
    }));

    /* 
    const loadPatients = async () => {
        try {
            const patients = await getPatients();
            setData(patients);
        } catch (error) {
            console.error("Error cargando pacientes:", error);
        }
    }; 
    */

    const handleRecordClick = (args) => {
        if (args.rowData && args.rowData.id) {
            navigate(`/dashboard/pacientes/${args.rowData.id}`);
        }
    };

    const patientTemplate = (props) => {
        const initials = ((props.nombre?.[0] || '') + (props.apellido?.[0] || '')).toUpperCase();
        return (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white">
                    {initials}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-slate-800 text-[15px]">{props.nombre} {props.apellido}</span>
                    <span className="text-xs text-slate-400 font-medium tracking-wide">ID: {props.id}</span>
                </div>
            </div>
        );
    };

    const dateTemplate = (props) => {
        if (!props.fecha_nacimiento) return <span>-</span>;
        const date = new Date(props.fecha_nacimiento);
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-xs border border-indigo-100">
                📅 {date.toLocaleDateString()}
            </span>
        );
    };

    const contactTemplate = (props) => {
        return (
            <span className="text-slate-500 font-medium text-sm">{props.contacto || 'N/A'}</span>
        );
    };

    return (
        <div className='p-6 bg-white rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden'>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <GridComponent
                dataSource={patients}
                allowPaging={true}
                pageSettings={{ pageSize: 8 }}
                allowSorting={true}
                allowFiltering={true}
                filterSettings={{ type: 'Menu' }}
                gridLines='Horizontal'
                width='100%'
                rowHeight={70}
                enableHover={true}
                className="custom-grid"
                recordClick={handleRecordClick}
            >
                <ColumnsDirective>
                    <ColumnDirective headerText='Paciente' width='240' template={patientTemplate} field='nombre' />
                    <ColumnDirective field='fecha_nacimiento' headerText='Fecha Nacimiento' width='160' template={dateTemplate} />
                    <ColumnDirective field='contacto' headerText='Contacto' width='180' template={contactTemplate} />
                    <ColumnDirective field='creado_en' headerText='Registrado' width='140' type='date' format='dd/MM/yyyy' textAlign='Right' />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Filter, Toolbar]} />
            </GridComponent>
        </div>
    );
});

export default PatientGrid;
