import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPreRegister } from '../../redux/actions/preRegistration';

import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { Wrapper } from '../../components/Wrapper';
import { capitalizarPalabras } from '../../common/upperCaseWord';


function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export const CandidatesPage = () => {
	const dispatch = useDispatch();

	const {
		allPreRegisters
	} = useSelector((state) => state.preRegistration);

	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getAllPreRegister({ id: user.user._id, roles: user.user.roles }))
	}, [])

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
		{
			field: 'firstName',
			headerName: 'Nombre',
			flex: 1,
			renderCell: (params) => (
				<p>{capitalizarPalabras(params.value)}</p>
			),
		},
		{
			field: 'lastName',
			headerName: 'Apellido',
			flex: 1,
			renderCell: (params) => (
				<p>{capitalizarPalabras(params.value)}</p>
			),
		},
		{ field: 'email', headerName: 'Correo Electronico', flex: 1 },
		{ field: 'location', headerName: 'Locacion', flex: 1 },
		{ field: 'education', headerName: 'Nivel educativo', flex: 1 },
		{
			field: 'language',
			headerName: 'Idioma',
			flex: 1,
			renderCell: (params) => (
				<p>{capitalizarPalabras(params.value)}</p>
			),
		},
		{
			field: 'coordinador',
			headerName: 'Coordinador',
			flex: 1,
			renderCell: (params) => (
				<p>{capitalizarPalabras(params.value)}</p>
			),
		},
		{ field: 'createdAtFormatted', headerName: 'Fecha de registro', flex: 1 },
		{
			field: 'status',
			headerName: 'Estatus',
			flex: 1,
			renderCell: (params) => (
				<div className={classNames(
					params.value === 'completado'
						? 'text-lime-600 ring-lime-600 shadow-lime-600'
						: params.value === 'prospecto' ? 'text-orange-500 ring-orange-500 shadow-orange-500'
							: 'text-red-500 ring-red-500 shadow-red-500',
					'border-none ring-2  shadow-sm py-0 px-1 rounded-sm uppercase font-bold'
				)}>
					<span className="text-[.8rem]">{params.value}</span>
				</div>
			),
		},
		{
			field: 'action',
			headerName: 'Acciones',
			flex: 1,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => (
				<div style={{ textAlign: 'center' }}>
					{
						params.row.status === 'validando' ?
							(
								<Link
									to={`/candidatos/${params.id}`}
									className="px-4 py-1.5 bg-indigo-600 text-slate-50 rounded hover:bg-indigo-700"
								>
									Validar
								</Link>
							)
							: null
					}

				</div>
			),
		},
	];

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
			row.coordinador?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.status?.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<ContainerFull>
			<Heading
				title={`Lista de canditados`}
				subtitle={`Muestra la lista candidatos con su estatus de proceso`}
				center={false}
			/>
			{allPreRegisters && (
				<>
					<Wrapper>
						<input
							type="text"
							placeholder="Buscar un candidato"
							value={searchText}
							onChange={handleSearchChange}
							className='block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
					</Wrapper>

					<Wrapper>
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
					</Wrapper>
				</>

			)}
		</ContainerFull>
	);
}
