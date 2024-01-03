import React from 'react'

export const Wrapper = ({ children }) => {
	return (
		<div className='bg-white rounded-md border border-gray-950/10 my-4 p-6 w-full'>
			{children}
		</div>
	)
}
