import React from 'react';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export const ImagenUser = () => {
    return (
        <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
        </div>
    )
}
