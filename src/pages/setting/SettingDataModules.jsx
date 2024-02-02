import React from 'react'
import { Link } from 'react-router-dom'

export const SettingDataModules = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <p className='text-md font-semibold text-gray-900 mb-4'>Modificar informacion de modulos</p>
            <Link
                type='button'
                to='/ajustes/languages'
                className='w-[90%] text-center py-2 font-semibold text-md text-gray-900 border-2 hover:border-2 hover:shadow-md hover:shadow-indigo-900/30 hover:border-indigo-600 ho rounded-md'
            >Lenguajes</Link>
            <Link
                type='button'
                to='/ajustes/images-emcabezado'
                className='w-[90%] text-center py-2 font-semibold text-md text-gray-900 border-2 hover:border-2 hover:shadow-md hover:shadow-indigo-900/30 hover:border-indigo-600 ho rounded-md'
            >Imagenes de emcabezado</Link>
            <Link
                type='button'
                to='/ajustes/colores'
                className='w-[90%] text-center py-2 font-semibold text-md text-gray-900 border-2 hover:border-2 hover:shadow-md hover:shadow-indigo-900/30 hover:border-indigo-600 ho rounded-md'
            >Colores</Link>
            <Link
                type='button'
                to='/ajustes/niveles'
                className='w-[90%] text-center py-2 font-semibold text-md text-gray-900 border-2 hover:border-2 hover:shadow-md hover:shadow-indigo-900/30 hover:border-indigo-600 ho rounded-md'
            >Niveles</Link>
        </div>
    )
}
