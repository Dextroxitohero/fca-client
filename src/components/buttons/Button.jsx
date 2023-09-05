import React from 'react';



export const Button = ({
	label,
	onClick,
	disabled,
	outline,
	small,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type='button'
			className={`
				disabled:opacity-70
				disabled:cursor-not-allowed
				rounded-md
				hover:opacity-80
				transition
				px-10
				${outline ? 'bg-white' : 'bg-cyan'}
				${outline ? 'border-black' : 'bg-indigo-600'}
				${outline ? 'text-black' : 'text-white'}
				${small ? 'text-sm' : 'text-md'}
				${small ? 'py-1' : 'py-2'}
				${small ? 'font-light' : 'font-semibold'}
			`}
		>
			{label}
		</button>
	);
}
