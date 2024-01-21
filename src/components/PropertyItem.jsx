export const PropertyItem = ({title, description}) => {
    return (
        <div className={`
            sm:px-0
            px-4 
            py-2
            md:py-4
            sm:grid 
            sm:grid-cols-3 
            sm:gap-4 
        `}>
            <dt className={`
                text-sm 
                font-medium 
                leading-6 
                text-gray-900
                pl-4
            `}>{title}</dt>
            <dd className={`
                mt-1 
                text-sm 
                leading-6 
                text-gray-700 
                sm:col-span-2 
                sm:mt-0
                pl-4
            `}>{description}</dd>
        </div>
    )
}
