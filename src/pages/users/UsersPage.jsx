const people = [
	{
		name: 'Tom Cook',
		email: 'tom.cook@example.com',
		role: 'Maestro',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: null,
	},
	{
		name: 'Tom Cook',
		email: 'tom.cook@example.com',
		role: 'Maestro',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: null,
	},
	{
		name: 'Tom Cook',
		email: 'tom.cook@example.com',
		role: 'Maestro',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: null,
	},
	{
		name: 'Tom Cook',
		email: 'tom.cook@example.com',
		role: 'Maestro',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: null,
	},
	{
		name: 'Tom Cook',
		email: 'tom.cook@example.com',
		role: 'Maestro',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: null,
	},

]

export const UsersPage = () => {
	return (
		<div className="flex items-center justify-center">
			<div className="w-full sm:w-w-2xl max-w-3xl h-1/2  mt-[2rem]">

				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Usuarios</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quisquam ipsa aut et. Non, facere debitis eos velit ipsum neque!
					</p>
				</div>


				<ul role="list" className="divide-y divide-gray-100">
					{people.map((person, i) => (
						<li key={i} className="flex justify-between gap-x-6 py-5">
							<div className="flex gap-x-4">
								<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
								<div className="min-w-0 flex-auto">
									<p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
									<p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
								</div>
							</div>
							<div className="hidden sm:flex sm:flex-col sm:items-end">
								<p className="text-sm leading-6 text-gray-900">{person.role}</p>
								{person.lastSeen ? (
									<p className="mt-1 text-xs leading-5 text-gray-500">
										Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
									</p>
								) : (
									<div className="mt-1 flex items-center gap-x-1.5">
										<div className="flex-none rounded-full bg-emerald-500/20 p-1">
											<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
										</div>
										<p className="text-xs leading-5 text-gray-500">Online</p>
									</div>
								)}
							</div>
						</li>
					))}
					
				</ul>
			</div>
		</div>
	)
}
