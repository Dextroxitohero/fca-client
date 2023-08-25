import React from 'react';

export const Heading = ({
	title,
	subtitle,
	center
}) => {
	return (
		<div className={`
			w-full 
			${center ? 'text-center' : 'text-start'}
		`}>
			<h2 className={`
				text-2xl 
				md:text-3xl 
				font-semibold 
				tracking-tight
				text-gray-900
        	`}>{title}</h2>
			<p className={`
				mt-1
				md:mt-4
				text-md
				leading-6 
				text-gray-500
			`}>
				{subtitle}
			</p>
		</div>

	);
}