import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { Modal } from '../../components/modal/Modal';
import { TrashIcon } from '@heroicons/react/24/outline';


export const ConfirmirRemoverHeaderImage = ({ open, setOpen, title, message, confirmAction, labelButonConfirm }) => {
    const cancelButtonRef = useRef(null);
    return (
        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
                        <TrashIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={confirmAction}
                >
                    {labelButonConfirm}
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    )
}
