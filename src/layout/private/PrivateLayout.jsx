import React from 'react';

import { Navbar } from '../../components/navbar/Navbar'

export const PrivateLayout = ({ children }) => {
  // Aquí puedes agregar el diseño para rutas privadas
  return (
    <div>
      <h1>Private Layout</h1>
      <Navbar/>
      {children}
    </div>
  );
};