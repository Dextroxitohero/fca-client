// Navigation.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLastVisitedRoute from '../../hooks/useLastVisitedRoute';

export const Navigation = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, updateLastVisitedRoute] = useLastVisitedRoute();

  useEffect(() => {
    // Actualizar la última ruta visitada en cada cambio de ruta
    updateLastVisitedRoute(location.pathname);
  }, [location.pathname, updateLastVisitedRoute]);

  return <>{children}</>;
};

