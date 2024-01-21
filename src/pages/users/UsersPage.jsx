import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../../redux/actions/users';

import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { Wrapper } from '../../components/Wrapper';
import { Button } from '../../components/buttons/Button';
import { AddNewUserModal } from './AddNewUserModal';

export const UsersPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllUsers())
	}, [])

	const {
		users
	} = useSelector((state) => state.users);

	const [openAddNewUserModal, setOpenAddNewUserModal] = useState(false)
	const [searchText, setSearchText] = useState('');

	// console.log(openModalAddNewUser)

	const rows = users;

	const columns = [
		{ field: 'firstName', headerName: 'Nombre', flex: 1 },
		{ field: 'lastName', headerName: 'Apellido', flex: 1 },
		{ field: 'email', headerName: 'Correo Electronico', flex: 1 },
		{ field: 'typeUser', headerName: 'Tipo de usuario', flex: 1 },
		{ field: 'createdAtFormatted', headerName: 'Fecha de registro', flex: 1 },
		{
			field: 'action',
			headerName: '',
			flex: 1,
			sortable: false,
			disableColumnMenu: true,
			renderCell: (params) => (
				<div style={{ margin: 'auto' }}>
					<Link
						to={`/perfil/${params.id}`}
						className="px-4 py-2.5 bg-indigo-600 text-white rounded"
					>
						Perfil
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
			row.typeUser?.toLowerCase().includes(searchText.toLowerCase()) ||
			row.createdAtFormatted?.toLowerCase().includes(searchText.toLowerCase())
	);


	return (
		<ContainerFull>
			<Heading
				title={`Lista de usuarios`}
				subtitle={`Muestra la lista de los todos los usuarios registrados en el sistema`}
				center={false}
			/>

			<div className='w-full flex justify-end mt-4'>
				<Button label={"Agregar nuevo usuario"} onClick={() => setOpenAddNewUserModal(true)} />
			</div>

			{users && (
				<>
					<Wrapper>
						<input
							type="text"
							placeholder="Buscar un usuario"
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
			<AddNewUserModal
				open={openAddNewUserModal}
				setOpen={setOpenAddNewUserModal}
			/>
		</ContainerFull>
	);
}
