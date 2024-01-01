export const Heading = ({ title, subtitle, center }) => {
	return (
		<div className={`
			w-full 
			${center ? 'text-center' : 'text-start'}
		`}>
			<h2 className='text-2xl font-bold tracking-tighttext-gray-950'>{title}</h2>
			<p className='mt-1 text-sm leading-6 text-gray-500'>
				{subtitle}
			</p>
		</div>

	);
}