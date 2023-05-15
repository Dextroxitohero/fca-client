import React from 'react';

export const PublicLayout = ({ children }) => {
  // Aquí puedes agregar el diseño para rutas públicas
  return (
    <div>
      <h1>Public Layout</h1>
      {children}
    </div>
  );
};