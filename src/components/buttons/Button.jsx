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
				flex
				rounded-lg
				transition
				hover:bg-indigo-700
				px-8
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
