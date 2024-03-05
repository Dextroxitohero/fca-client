import React from 'react'

export const ContainerFull = ({ children }) => {
    return (
        <div className={`flex items-center justify-center`}>
            <div className={`w-[95%] my-4`}>
                {children}
            </div>
        </div>
    )
}
