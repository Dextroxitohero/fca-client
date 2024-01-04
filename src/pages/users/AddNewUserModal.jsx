import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Modal } from '../../components/modal/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


export const AddNewUserModal = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null)

	return (

		<Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
			<div className="bg-white px-4 py-4">
				<div className="sm:flex sm:items-start">

					<div>
						<Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-gray-950">
							Crear invitacion para nuevo usuario
						</Dialog.Title>
						<div className="mt-6">
							<p className="text-sm text-center text-gray-600">
								Ingresa el correo electronico del usuario que deseas invitar a la plataforma.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

			</div>
		</Modal>

	)



	// return (
	// 	<Transition.Root show={open} as={Fragment}>
	// 		<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
	// 			<Transition.Child
	// 				as={Fragment}
	// 				enter="ease-out duration-300"
	// 				enterFrom="opacity-0"
	// 				enterTo="opacity-100"
	// 				leave="ease-in duration-200"
	// 				leaveFrom="opacity-100"
	// 				leaveTo="opacity-0"
	// 			>
	// 				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
	// 			</Transition.Child>

	// 			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
	// 				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
	// 					<Transition.Child
	// 						as={Fragment}
	// 						enter="ease-out duration-300"
	// 						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
	// 						enterTo="opacity-100 translate-y-0 sm:scale-100"
	// 						leave="ease-in duration-200"
	// 						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
	// 						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
	// 					>
	// 						<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

	// 						</Dialog.Panel>
	// 					</Transition.Child>
	// 				</div>
	// 			</div>
	// 		</Dialog>
	// 	</Transition.Root>
	// )
}
