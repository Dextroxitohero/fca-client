import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';

import { Modal } from '../../../components/modal/Modal';
import { ButtonLoader } from '../../../components/buttons/ButtonLoader';
import { InputText } from '../../../components/inputs/InputText';

import { addChatMessageFileToCourse } from '../../../redux/actions/course';

import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button } from '../../../components/buttons/Button';

export const ModalAddMessageImage = ({ open, setOpen, courseId, userId }) => {
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [formData, setFormData] = useState({
        file: null,
        publicId: '',
        ext: '',
        message: '',
    });

    useEffect(() => {
        setFormData({
            file: null,
            publicId: '',
            ext: '',
            message: '',
        });
        setLoading(false);
        setPreviewImage(null);
        setPreviewFile(null);
    }, [open]);


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleEditImage = () => {
        setFormData((prevData) => ({
            ...prevData,
            file: null,
            ext: '',
        }));
        setPreviewImage(null)
        setPreviewFile(null)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Validar el formato del archivo
        const allowedExtensions = ['png', 'jpeg', 'jpg', 'pdf', 'docx'];
        const fileName = file.name.toLowerCase();
        const isValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));

        if (!isValidExtension) {
            toast.error('Formato de archivo no válido. Solo se permiten archivos .docx, .pdf, .png, .jpeg y .jpg.');
            // Puedes agregar más lógica aquí, como restablecer el formulario o realizar otras acciones
            return;
        }

        // Validar el tamaño del archivo (en bytes)
        const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB
        if (file.size > maxSizeInBytes) {
            toast.error('El tamaño del archivo no puede ser mayor a 3 MB.');
            // Puedes agregar más lógica aquí, como restablecer el formulario o realizar otras acciones
            return;
        }

        // Obtener la extensión del archivo
        const fileExtension = fileName.split('.').pop();

        // Continuar con el manejo del archivo si tanto el formato como el tamaño son válidos
        setFormData((prevData) => ({
            ...prevData,
            file: file,
            ext: fileExtension,
        }));

        const reader = new FileReader();

        reader.onloadend = () => {
            if (fileExtension === 'pdf' || fileExtension === 'docx') {
                setPreviewFile(fileName);
            } else {
                setPreviewImage(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const validateForm = () => {
        if (formData.file === null) {
            toast.error('Selecciona una imagen o archivo');
            return false;
        }
        if (formData.message === '') {
        	toast.error('Ingresa un mensaje');
        	return false;
        }
        return true;
    }

    const handleAddMessageUrl = async () => {
        const valid = validateForm();
        let typeMessage = '';
        if(formData.ext === 'pdf' || formData.ext === 'docx') {
            typeMessage = 'file';
        }else if(formData.ext === 'png' || formData.ext === 'jpeg' || formData.ext === 'jpg') {
            typeMessage = 'image';
        }
        if (valid) {
        	setLoading(true);
        	dispatch(addChatMessageFileToCourse(formData.file, courseId, userId, formData.message, '', formData.url, typeMessage))
        		.then((result) => {
        			if (result.status === 201) {
        				setOpen(false);
                        setFormData({
                            file: null,
                            publicId: '',
                            ext: '',
                            message: '',
                        });
                        setLoading(false);
                        setPreviewImage(null)
                        setPreviewFile(null)
        				setLoading(false);
        			} else {
        				toast.error(result.message);
        				setOpen(false);
                        setFormData({
                            file: null,
                            publicId: '',
                            ext: '',
                            message: '',
                        });
                        setLoading(false);
                        setPreviewImage(null)
                        setPreviewFile(null)
        				setLoading(false);
        			}
        		});
        }
    }


    return (
        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
            <div className="bg-white p-4">
                <div className="flex flex-col">

                    <Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-gray-950">
                        Crear un mensaje con un archivo o imagen
                    </Dialog.Title>
                    <div className="mt-6">
                        <p className="text-sm text-center text-gray-600">
                            Aqui puedes crear un mensaje con un archivo o imagen, selecciona una imagen y escribe un mensaje.
                        </p>

                    </div>
                    <div className='w-[90%] mx-auto grid grid-cols-1 gap-4 m-8'>
                        <div>
                            {(!previewImage && !previewFile) && (
                                <div className='flex justify-center rounded-lg border border-dashed px-6 py-10 mt-2'>
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex flex-wrap justify-center gap-1 text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-mdbg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Seleciona una archivo o imagen</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className="text-xs leading-5 text-gray-700">Tipos de imagen permitidos .png, .jpeg y .jpg.</p>
                                            <p className="text-xs leading-5 text-gray-700">Tipos de archivos permitidos .docx y .pdf,</p>
                                        </div>
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
                                            onClick={handleEditImage}
                                        />
                                    </div>
                                </div>
                            )}
                            {previewFile && (
                                <div className=''>
                                    <img
                                        src={'https://res.cloudinary.com/dax0v05jz/image/upload/v1709457834/uploads/qlhxgtbnn9q9yujymp3l.png'}
                                        alt="Encabezado"
                                        className="mt-4 mx-auto  w-10/12"
                                    />
                                    <p className="text-md text-center font-semibold leading-5 text-gray-700">{previewFile}</p>
                                    <div className="mt-6 flex items-center justify-around gap-x-6">
                                        <Button
                                            label='Selecionar otro archivo'
                                            onClick={handleEditImage}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <InputText
                                id={'message'}
                                name={'message'}
                                type={'message'}
                                label={'Ingresa tu mensaje'}
                                onChange={(e) => onChange(e)}
                                value={formData.message}
                                placeholder={'Ingresa tu mensaje'}
                            />
                        </div>
                        <div className='mt-[20px]'>
                            <button
                                type='button'
                                disabled={loading}
                                className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
                                onClick={() => handleAddMessageUrl()}
                            >
                                {loading
                                    ? <ButtonLoader />
                                    : 'Agregar enlace'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
