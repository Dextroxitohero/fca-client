export const PropertyListItem = ({ children }) => {
    return (
        <div className={`w-11/12`}>
            <dl className={`divide-y divide-gray-100 w-10/12`}>
                {children}
            </dl>
        </div>
    )
}
