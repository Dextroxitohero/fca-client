import { Fragment } from 'react'
import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const HomePage = () => {
	return (
		<>
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">


					<div className="lg:flex lg:items-center lg:justify-between">
						<div className="min-w-0 flex-1">
							<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">								
								Tom Cook
							</h2>
							<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									Maestro
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									San Luis Potosi
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									14 de Mayo del 2023
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
