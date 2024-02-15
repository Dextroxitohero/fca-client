import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { getSelectedPreRegister, validateCandidate } from '../../redux/actions/preRegistration';
import { optionsCoordinadors, optionsAllAccountsBank, optionsAllCourseList } from '../../redux/actions/options';


import { PropertyListItem } from '../../components/PropertyListItem';
import { PropertyItem } from '../../components/PropertyItem';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { Title } from '../../components/Title';
import { Wrapper } from '../../components/Wrapper';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { formatDate } from '../../common/formatDateText';
import { capitalizarPalabras, firstCapitalLetter } from '../../common/upperCaseWord';
import { ConformationValidationModal } from './ConformationValidationModal';
import { InputDate } from '../../components/inputDate/InputDate';
import { InputCourse } from '../../components/inputCourse/InputCourse';

import { baseURLImage } from '../../common/urlBase';

export const ValidateCandidate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectExpireDate, setSelectExpireDate] = useState(null);

    const [loading, setLoading] = useState(false);
    const [openConfirmationValidationModal, setOpenConfirmationValidationModal] = useState(false)
    const [courseSelected, setCourseSelected] = useState();

    const { preRegisterSelected } = useSelector((state) => state.preRegistration);
    const { coordinadors, accountsBank, coursesList } = useSelector((state) => state.options);

    useEffect(() => {
        dispatch(getSelectedPreRegister(id))
    }, [])

    useEffect(() => {
        dispatch(optionsCoordinadors());
        dispatch(optionsAllAccountsBank());
        dispatch(optionsAllCourseList());
    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            paymentDeadlineDate: selectExpireDate,
        }));
    }, [selectExpireDate])

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            idCourse: courseSelected?._id,
        }));
    }, [courseSelected])

    const {
        id: _id, firstName, lastName, email,
        phone, dateBirth, location,
        education, language, status,
        createdAt, account, coordinador,
        fileName
    } = preRegisterSelected;

    const [formData, setFormData] = useState({
        idPreregister: id,
        coordinador: coordinador?._id,
        createdBy: coordinador?._id,
        account: account,
        paymentDeadlineDate: '',
        idCourse: '',
    });

    const validationData = () => {
        if (!formData.coordinador) {
            return false;
        }
        if (!formData.account) {
            return false;
        }
        if (!formData.idCourse) {
            toast.error('Selecciona el curso al que se inscribira el candidato');
            return false;
        }
        if (!formData.paymentDeadlineDate) {
            toast.error('Selecciona la fecha de vencimiento de pago');
            return false;
        }
        return true;
    }

    const handleValidationCadidate = () => {
        const validation = validationData();
        if (validation) {
            setOpenConfirmationValidationModal(true);
            dispatch(validateCandidate(formData))
                .then((result) => {
                    if (result.status === 201) {
                        toast.success(result.message);
                        navigate('/');
                    } else {
                        toast.error(result.message);

                    }
                    setOpenConfirmationValidationModal(false);
                    setLoading(false);
                });
        }
    }

    return (
        <ContainerFull>
            <Heading
                title={`Perfil de usuario de pre registro`}
                subtitle={`Examina y verifica la información proporcionada por el candidato. Si la información es correcta, procede a la validación.`}
                center={false}
            />
            <Wrapper>
                <div className='w-full flex flex-col lg:flex-row gap-4'>
                    <div className='w-full lg:w-[50%]'>
                        <Title title='Informacion del cadidato' />
                        <PropertyListItem>
                            <PropertyItem
                                title={`Nombre completo`}
                                description={`${firstCapitalLetter(firstName)} ${firstCapitalLetter(lastName)}`}
                            />
                            <PropertyItem
                                title={`Email`}
                                description={email}
                            />
                            <PropertyItem
                                title={`Telefono`}
                                description={phone}
                            />
                            <PropertyItem
                                title={`Fecha de nacimiento`}
                                description={capitalizarPalabras(formatDate(dateBirth))}
                            />
                            <PropertyItem
                                title={`Ubicacion`}
                                description={firstCapitalLetter(location)}
                            />
                            <PropertyItem
                                title={`Nivel educativo`}
                                description={firstCapitalLetter(education)}
                            />
                            <PropertyItem
                                title={`Estatus del preregistro`}
                                description={firstCapitalLetter(status)}
                            />
                            <PropertyItem
                                title={`Idioma seleccionado por el usuario`}
                                description={firstCapitalLetter(language)}
                            />
                            <PropertyItem
                                title={`Fecha de registro`}
                                description={capitalizarPalabras(formatDate(createdAt))}
                            />
                        </PropertyListItem>
                    </div>
                    <div className='w-full lg:w-[50%]'>
                        {/* Container image */}
                        <div className='mx-auto w-[40%]'>
                            <div>
                                <h3 className="text-md text-center font-semibold text-gray-900 my-8">Comprobante de pago</h3>
                                <img src={`${baseURLImage}${fileName}`} alt="" className="mx-auto w-11/12 flex-shrink-0 rounded-md shadow-md" />
                            </div>
                        </div>
                        {/* Property activation */}
                        <div className='w-[70%] mx-auto flex flex-col justify-center items-center pb-4'>

                        </div>
                    </div>
                </div>
            </Wrapper>

            <Wrapper>
                <div className='w-full flex flex-col lg:flex-row gap-4'>
                    <div className='w-full lg:w-[50%]'>
                        <Title title='Confirmar validacion' />
                        <div className='w-[95%] mx-auto mb-6'>
                            <h3 className="text-md font-semibold text-gray-900 my-8">Seleciona un curso para inscribir al candidato</h3>
                            <div className='max-h-[500px] overflow-auto p-8 bg-gray-100 py-6 shadow-sm'>
                                <InputCourse
                                    coursesList={coursesList}
                                    courseSelected={courseSelected}
                                    setCourseSelected={setCourseSelected}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-[50%] flex flex-col justify-center items-center'>
                        <h3 className="text-md text-center font-semibold text-gray-900 my-8">Seleciona la fecha vencimiento</h3>
                        <div className='w-full flex justify-center items-center'>
                            <InputDate
                                id={'dateExpired'}
                                selected={selectExpireDate}
                                onChange={setSelectExpireDate}
                            />
                        </div>
                        <div className='w-[70%] flex justify-center items-center mt-6'>

                            <button
                                type='button'
                                disabled={loading}
                                className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
                                onClick={() => handleValidationCadidate()}
                            >
                                {loading
                                    ? <ButtonLoader />
                                    : 'Confirmacion de validacion'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <ConformationValidationModal
                open={openConfirmationValidationModal}
                setOpen={setOpenConfirmationValidationModal}
            />
        </ContainerFull>
    )
}
