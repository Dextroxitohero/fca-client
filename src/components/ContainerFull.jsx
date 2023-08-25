import React from 'react'

export const ContainerFull = ({ children }) => {
    return (
        <div className={`
            flex 
            items-center 
            justify-center
        `}>
            <div className={`
                w-full 
                md:w-10/12 
                md:mt-16
                pt-12 
                px-8 
                md:px-0 
                md:pt-0 
            `}>
                {children}
            </div>
        </div>
    )
}