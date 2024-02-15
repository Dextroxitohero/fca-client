import { Fragment } from 'react'
import {
	BriefcaseIcon,
	CalendarIcon,
	MapPinIcon,
} from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';
import { capitalizarPalabras, firstCapitalLetter } from '../../common/upperCaseWord';
import { formatDate } from '../../common/formatDateText';


export const HomePage = () => {

	const { firstName, lastName, typeUser, location } = useSelector((state) => state.user?.user)

	return (
		<>
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<div className="lg:flex lg:items-center lg:justify-between">
						<div className="min-w-0 flex-1">
							<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
								{`Bienvenido ${firstCapitalLetter(firstName)} ${firstCapitalLetter(lastName)}`}
							</h2>
							<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									{firstCapitalLetter(typeUser)}
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									{capitalizarPalabras(location)}
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									{capitalizarPalabras(formatDate(new Date().toLocaleDateString()))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
