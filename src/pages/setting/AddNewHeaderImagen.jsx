import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { Modal } from '../../components/modal/Modal';
import { toast } from 'react-hot-toast';


import { InputText } from '../../components/inputs/InputText';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button } from '../../components/buttons/Button';
import { addNewHeaderImage, getAllHeadersImages } from '../../redux/actions/setting';

export const AddNewHeaderImagen = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        file: null,
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                name: '',
                file: null,
            });
            setPreviewImage(null);
        }
    }, [open])
    

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const handleRemoveImage = () => {
        setFormData((prevData) => ({
            ...prevData,
            file: null,
        }));
        setPreviewImage(null)
    }

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        setFormData((prevData) => ({
            ...prevData,
            file: file,
        }));

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    

    const validForm = () => {
        const { name, file } = formData;
        if (name.trim() === '' || file === null) {
            return false;
        }
        return true;
    };


    const handleSendEmail = () => {
        setLoading(true);
        const { name, file } = formData;
        const formValidation = validForm();
        if (formValidation) {
            dispatch(addNewHeaderImage({ name, file  }))
                .then((result) => {
                    if (result.status === 201) {
                        toast.success(result.message);
                        setOpen(false);
                        setFormData({
                            name: '',
                            file : ''
                        });
                        dispatch(getAllHeadersImages());
                    }
                    if (result.status === 400) {
                        toast.error(result.message);
                    }
                    if (result.status === 500) {
                        toast.error(result.message);
                    }
                    setLoading(false);
                });
        }else{
            toast.error('Por favor, completa todos los campos.');
            setLoading(false);
        }
    }

    return (
        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
            <div className="bg-white px-4 py-4">
                <div className="sm:flex sm:items-center">

                    <div>
                        <Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-gray-950">
                            Agregar una nueva imagen para los emcabezados de los cursos
                        </Dialog.Title>
                        <div className="mt-6">
                            <p className="text-sm text-center text-gray-600">
                                Ingresa nombre y la nueva imagen para el encabezado de los cursos.
                            </p>

                        </div>
                        <div className='flex items-center mt-4'>
                            <div className='w-11/12 mx-auto grid grid-cols-1 gap-6'>

                                {!previewImage && (
                                    <div className='flex justify-center rounded-lg border border-dashed px-6 py-10 mt-2'>
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-mdbg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Seleciona una imagen para encabezado.</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">Tipos de imagen permitidos PNG y JPG.</p>
                                        </div>
                                    </div>
                                )}
                                {previewImage && (
                                    <div className=''>
                                        <img
                                            src={previewImage}
                                            alt="Encabezado"
                                            className="mt-4 mx-auto  w-11/12"
                                        />
                                        <div className="mt-6 flex items-center justify-around gap-x-6">
                                            <Button
                                                label='Selecionar otra imagen'
                                                disabled={loading}
                                                onClick={handleRemoveImage}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <InputText
                                        id={'name'}
                                        name={'name'}
                                        type={'name'}
                                        label={'Nombre para la imagen del encabezado.'}
                                        onChange={(e) => onChange(e)}
                                        value={formData.name}
                                        placeholder={'Ingresa el nombre del encabezado.'}
                                        disabled={false}
                                    />
                                </div>

                                <div className='mt-2'>
                                    <button
                                        type='button'
                                        disabled={loading}
                                        className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
                                        onClick={handleSendEmail}
                                    >
                                        {loading
                                            ? <ButtonLoader />
                                            : 'Agregar imagen'
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
