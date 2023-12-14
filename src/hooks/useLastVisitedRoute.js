// useLastVisitedRoute.js
import { useEffect, useState } from 'react';

const useLastVisitedRoute = () => {
    const [lastVisitedRoute, setLastVisitedRoute] = useState(() => {
        // Al montar el componente, recuperar la última ruta visitada desde el localStorage
        return localStorage.getItem('lastVisitedRoute') || null;
    });

    useEffect(() => {
        // Guardar la última ruta visitada en el localStorage
        localStorage.setItem('lastVisitedRoute', lastVisitedRoute);
    }, [lastVisitedRoute]);

    const updateLastVisitedRoute = (route) => {
        // Actualizar el estado y guardar en localStorage cuando cambie la ruta
        setLastVisitedRoute(route);
        localStorage.setItem('lastVisitedRoute', route);
    };

    return [lastVisitedRoute, updateLastVisitedRoute];
};

export default useLastVisitedRoute;
