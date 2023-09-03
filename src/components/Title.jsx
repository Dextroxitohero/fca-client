import React from 'react'

export const Title = ({ title, center }) => {
    return (
        <div className={`
            w-full 
        `}>
            <h2 className={`
                text-2xl
                mb-8
                font-bold 
                tracking-tight
                text-gray-800
                ${center ? 'text-center' : 'text-start'}
            `}>{title}</h2>
        </div>
    )
}

