import React, { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPreRegister } from '../../redux/actions/preRegistration';
import { Link } from 'react-router-dom';



export const CandidatesPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllPreRegister())
	}, [])

	const {
		allPreRegisters
	} = useSelector((state) => state.preRegistration)

	const [searchText, setSearchText] = useState('');

	const rows = allPreRegisters;

	const getStatusColor = (status) => {
		switch (status) {
			case 'prospecto':
				return 'orange';
			case 'completado':
				return 'green';
			case 'validando':
				return 'red';
			default:
				return 'black';
		}
	};

	const columns = [
		{ field: 'firstName', headerName: 'Nombre', flex: 1 },
		{ field: 'lastName', headerName: 'Apellido', flex: 1 },
		{ field: 'email', headerName: 'Correo Electronico', flex: 1 },
		{ field: 'location', headerName: 'Locacion', flex: 1 },
		{ field: 'education', headerName: 'Nivel educativo', flex: 1 },
		{ field: 'language', headerName: 'Idioma', flex: 1 },
		{ field: 'assessor', headerName: 'Asesor', flex: 1 },
		{ field: 'createdAtFormatted', headerName: 'Fecha de registro', flex: 1 },
		{
			field: 'status',
			headerName: 'Estatus',
			flex: 1,
			renderCell: (params) => (
				<span style={{ color: getStatusColor(params.value) }}>{params.value}</span>
			),
		},
		{
			field: 'action',
			headerName: '',
			flex: 1,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => (
				<div style={{ textAlign: 'center' }}>
					<Link
						to={`/candidatos/${params.id}`}
						className="px-2 py-1 bg-indigo-600 text-white rounded"
					>
						Validar
					</Link>
				</div>
			),
		},
	];

	// const handleRowClick = (params) => {
	// 	console.log(params.row)
	// };

	const handleSearchChange = (event) => {
		const searchText = event.target.value;
		setSearchText(searchText);
	};

	const filteredRows = rows.filter(
		(row) =>
			row.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.email?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.phone?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.education?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.language?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.createdAtFormatted?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.assessor?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.status?.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16 pt-4">
			{allPreRegisters && (

				<>
					<div>
						<input
							type="text"
							placeholder="Buscar"
							value={searchText}
							onChange={handleSearchChange}
							className={`
									block 
									w-1/5 
									rounded-md 
									border-0 
									py-2 
									px-4
									text-gray-900 
									shadow-sm 
									ring-1 
									ring-inset 
									ring-gray-300 
									placeholder:text-gray-400 
									focus:ring-2 
									focus:ring-inset 
									focus:ring-indigo-600 
									sm:text-sm 
									sm:leading-6
									mb-6
								`}
						/>
						<DataGrid
							rows={filteredRows}
							columns={columns}
							// onRowClick={handleRowClick}
							localeText={esES.components.MuiDataGrid.defaultProps.localeText}
							initialState={{
								pagination: {
									paginationModel: { pageSize: 10, page: 0, },
								},
							}}
							pageSizeOptions={[10, 15, 25]}
						/>
					</div>
				</>
			)}
		</div>
	);
}
