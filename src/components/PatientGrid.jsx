import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { getPatients } from '../services/patientService';
import '@syncfusion/ej2-base/styles/bootstrap.css';
import '@syncfusion/ej2-buttons/styles/bootstrap.css';
import '@syncfusion/ej2-calendars/styles/bootstrap.css';
import '@syncfusion/ej2-dropdowns/styles/bootstrap.css';
import '@syncfusion/ej2-inputs/styles/bootstrap.css';
import '@syncfusion/ej2-navigations/styles/bootstrap.css';
import '@syncfusion/ej2-popups/styles/bootstrap.css';
import '@syncfusion/ej2-splitbuttons/styles/bootstrap.css';
import '@syncfusion/ej2-react-grids/styles/bootstrap.css';

const PatientGrid = forwardRef((props, ref) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadPatients();
    }, []);

    useImperativeHandle(ref, () => ({
        loadPatients
    }));

    const loadPatients = async () => {
        try {
            const patients = await getPatients();
            setData(patients);
        } catch (error) {
            console.error("Error cargando pacientes:", error);
        }
    };

    const patientTemplate = (props) => {
        const initials = ((props.nombre?.[0] || '') + (props.apellido?.[0] || '')).toUpperCase();
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '600', fontSize: '13px', boxShadow: '0 2px 4px rgba(37,99,235,0.2)'
                }}>
                    {initials}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '14px' }}>{props.nombre} {props.apellido}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>ID: {props.id}</span>
                </div>
            </div>
        );
    };

    const dateTemplate = (props) => {
        if (!props.fecha_nacimiento) return <span>-</span>;
        const date = new Date(props.fecha_nacimiento);
        return (
            <span style={{
                padding: '4px 8px', borderRadius: '4px',
                backgroundColor: '#f1f5f9', color: 'var(--text-secondary)',
                fontWeight: '500', fontSize: '12px'
            }}>
                {date.toLocaleDateString()}
            </span>
        );
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent
                    dataSource={data}
                    allowPaging={true}
                    pageSettings={{ pageSize: 10 }}
                    allowSorting={true}
                    allowFiltering={true}
                    filterSettings={{ type: 'Menu' }}
                    toolbar={['Search']}
                    gridLines='Horizontal'
                    width='100%'
                >
                    <ColumnsDirective>
                        <ColumnDirective headerText='Paciente' width='220' template={patientTemplate} field='nombre' />
                        {/* Field 'nombre' needed for sorting/filtering to work reasonably well on this column */}
                        <ColumnDirective field='fecha_nacimiento' headerText='Fecha N.' width='130' template={dateTemplate} />
                        <ColumnDirective field='contacto' headerText='Contacto' width='180' />
                        <ColumnDirective field='creado_en' headerText='Registro' width='130' type='date' format='dd/MM/yyyy' />
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter, Toolbar]} />
                </GridComponent>
            </div>
        </div>
    );
});

export default PatientGrid;
