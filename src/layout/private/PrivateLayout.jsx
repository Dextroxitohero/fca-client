import React from 'react';

import { Navbar } from '../../components/navbar/Navbar'

export const PrivateLayout = ({ children }) => {
	// Aquí puedes agregar el diseño para rutas privadas
	return (
		<div>
			<Navbar />
			<div className='pb-20 pt-[4rem]'>
				{children}
			</div>
		</div>
	);
};