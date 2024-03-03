import { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popover, Transition } from '@headlessui/react';
import { BarsArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

import { ModalDeleteMessage } from './ModalDeleteMessage';

import { removeChatMessageToCourse } from '../../../redux/actions/course';

export const MessageMenu = ({ courseId, chatId, userId, messageId, typeMessage, publicId }) => {
    const dispatch = useDispatch();
    const [openModalDeleteMessage, setOpenModalDeleteMessage] = useState(false);
    const [loadingDeleteMessage, setLoadingDeleteMessage] = useState(false);
    const cancelDeleteMessageRef = useRef(null);

    const handleConfirmDeleteMessage = () => {
        setLoadingDeleteMessage(true);
        dispatch(removeChatMessageToCourse(courseId, chatId, userId, messageId, typeMessage, publicId))
            .then((result) => {
                if (result.status === 200) {
                    toast.success(result.message);
                    // dispatch(getChatByIdCourse(idCourse));
                    setOpenModalDeleteMessage(false);
                    setLoadingDeleteMessage(false);
                } else {
                    toast.error(result.message);
                    setOpenModalDeleteMessage(false);
                    setLoadingDeleteMessage(false);
                }
            });
    }

    return (
        <>
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className='text-gray-950'
                        >
                            <BarsArrowDownIcon className='w-[16px]' />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 -translate-x-[90%] transform w-[200px]">
                                <div className="overflow-hidden rounded-lg shadow-md shadow-indigo-900/10 ring-1 ring-black/5">
                                    <div className="relative flex flex-wrap gap-4 bg-white p-2">
                                        <button
                                            onClick={() => setOpenModalDeleteMessage(true)}
                                            className='w-full flex justify-around items-center p-2 rounded-md hover:bg-gray-100'>
                                            <TrashIcon className='w-[16px]' />
                                            <p>Borrar mensaje</p>
                                        </button>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
            <ModalDeleteMessage
                open={openModalDeleteMessage}
                setOpen={setOpenModalDeleteMessage}
                cancelButtonRef={cancelDeleteMessageRef}
                confirmAction={handleConfirmDeleteMessage}
                loadingDeleteMessage={loadingDeleteMessage}
                title={'Estas seguro de borrar el mensaje?'}
                labelButonConfirm={'Borrar mensaje'}
            />
        </>
    )
}