import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { Modal } from '../../components/modal/Modal';

import { ButtonLoader } from '../../components/buttons/ButtonLoader'

export const ConformationValidationModal = ({ open, setOpen }) => {

    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);



    return (
        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
            <div className="bg-white px-4 py-4">
                <div className="sm:flex sm:items-center">

                    <div>
                        <Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-gray-950">
                            Validacion de datos de candidato
                        </Dialog.Title>
                        <div className="mt-6">
                            <p className="text-sm text-center text-gray-600">
                                Para validar un candidato, es necesario asignar un curso al candidato. Ademas selecionar la fecha de vencimiento del pago.
                            </p>

                        </div>
                        <div className='flex items-center mt-4'>
                            <div className='w-11/12 mx-auto grid grid-cols-1 gap-6'>
                                <div className='mt-2'>
                                    <button
                                        type='button'
                                        className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
                                        onClick={() => { }}
                                    >
                                        {loading
                                            ? <ButtonLoader />
                                            : 'Confirmacion de validacion'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
