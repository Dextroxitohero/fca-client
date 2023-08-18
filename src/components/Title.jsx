import React from 'react'

export const Title = ({ title }) => {
    return (
        <div className={`
            w-full 
        `}>
            <h2 className={`
                text-xl
                pb-2 
                font-semibold 
                tracking-tight
                text-gray-900
            `}>{title}</h2>
            <div className="w-9/12">
                <div className="border-t-2 border-gray-100"></div>
            </div>
        </div>
    )
}
