import React from 'react'

export const Title = ({ title, center }) => {
    return (
        <div className={`
            w-full 
        `}>
            <h2 className={`
                text-xl
                mb-8
                font-semibold 
                tracking-tight
                text-gray-900
                ${center ? 'text-center' : 'text-start'}
            `}>{title}</h2>
        </div>
    )
}
