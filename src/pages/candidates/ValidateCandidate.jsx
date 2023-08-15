import React from 'react';
import { useParams } from 'react-router-dom';

export const ValidateCandidate = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    console.log(id)
    return (
        <div>ValidateCandidate</div>
    )
}
