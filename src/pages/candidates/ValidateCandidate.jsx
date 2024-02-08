import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyListItem } from '../../components/PropertyListItem';
import { PropertyItem } from '../../components/PropertyItem';

import { getSelectedPreRegister } from '../../redux/actions/preRegistration';
import { optionsCoordinadors, optionsAllAccountsBank, optionsAllCourseList } from '../../redux/actions/options';


import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { Title } from '../../components/Title';
import { InputSelect } from '../../components/inputs/InputSelect'
import { Button } from '../../components/buttons/Button';
import { Wrapper } from '../../components/Wrapper';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { formatDate } from '../../common/formatDateText';
import { capitalizarPalabras, firstCapitalLetter } from '../../common/upperCaseWord';
import { ConformationValidationModal } from './ConformationValidationModal';
import { DividerCenter } from '../../components/DividerCenter';
import { InputDate } from '../../components/inputs/InputDate';
import { InputCourse } from '../../components/inputCourse/InputCourse';


export const ValidateCandidate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [openConfirmationValidationModal, setOpenConfirmationValidationModal] = useState(false)
    const [courseSelected, setCourseSelected] = useState();

    const { preRegisterSelected } = useSelector((state) => state.preRegistration);
    const { coordinadors, accountsBank, coursesList } = useSelector((state) => state.options);

    // const baseURLImage = 'http://localhost:8000/uploads/images/';
    const baseURLImage = 'https://fca-server-production.up.railway.app/uploads/images/';

    useEffect(() => {
        dispatch(getSelectedPreRegister(id))
    }, [])

    useEffect(() => {
        dispatch(optionsCoordinadors());
        dispatch(optionsAllAccountsBank());
        dispatch(optionsAllCourseList());
    }, []);

    const {
        firstName, lastName, email,
        phone, dateBirth, location,
        education, language, status,
        createdAt, account, coordinador,
        fileName
    } = preRegisterSelected;

    const [formData, setFormData] = useState({
        coordinador: coordinador?._id,
        account: account,
        dateExpired: '',
        idCurso: '',
    });


    console.log(courseSelected)
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleDate = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dateExpired: date,
        }));
    }

    return (
        <ContainerFull>
            <Heading
                title={`Perfil de usuario de pre registro`}
                subtitle={`Examina y verifica la información proporcionada por el candidato. Si la información es correcta, procede a la validación.`}
                center={false}
            />
            {/* Property pre register user */}
            <div className='flex flex-col md:flex-row md:gap-x-4'>
                <div className='w-full md:w-7/12'>
                    <Wrapper>
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

                        <DividerCenter title={''} />

                        <div className='w-11/12 mx-auto grid grid-col-1 md:grid-cols-2 gap-6'>

                            <div>
                                <Title title='Lista de cursos' />
                                <div className='max-h-[400px] overflow-auto p-4'>
                                    <div className='py-4'>
                                        <InputCourse
                                            coursesList={coursesList}
                                            courseSelected={courseSelected}
                                            setCourseSelected={setCourseSelected}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='py-8'>
                                <Title title='' />
                                <div>
                                    <InputDate
                                        name={'dateExpired'}
                                        label={'Ingresa la fecha de vencimiento del pago'}
                                        onChange={(date) => handleDate(date)}
                                        value={formData.dateExpired}
                                        placeholder={'Ingresa la fecha de vencimiento del pago'}
                                        disabled={false}
                                    />
                                </div>
                                <div className='mt-6'>

                                    <button
                                        type='button'
                                        disabled={loading}
                                        className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
                                        onClick={() => setOpenConfirmationValidationModal(true)}
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
                </div>
                <div className='w-full md:w-5/12'>
                    <Wrapper>
                        <Title title='Comprobante de pago' center />
                        {/* Container image */}
                        <div className='mx-auto w-2/3'>
                            <div>
                                <img src={`${baseURLImage}${fileName}`} alt="" className="mx-auto w-11/12 flex-shrink-0 rounded-md shadow-md" />
                            </div>
                        </div>
                        {/* Property activation */}
                        <div className='mx-auto border-gray-950 w-full md:w-5/6 mt-5 md:mt-10'>
                            <ul role="list" className="divide-y divide-gray-100">

                                <li className="flex justify-between gap-x-6 py-5">
                                    <div className="min-w-0 flex-auto">
                                        <InputSelect
                                            id="coordinador"
                                            name="coordinador"
                                            label="Coordinador"
                                            placeholder="Selecciona el coordinador"
                                            data={coordinadors}
                                            optionDefault="Seleciona el coordinador"
                                            value={formData.coordinador}
                                            onChange={(e) => onChange(e)}
                                            disabled={true}
                                        />
                                        <InputSelect
                                            id="account"
                                            name="account"
                                            label="Numero de cuenta"
                                            placeholder="Selecciona el numero de cuenta"
                                            data={accountsBank}
                                            optionDefault="Seleciona el numero de cuenta"
                                            value={formData.account}
                                            onChange={(e) => onChange(e)}
                                            disabled={true}
                                        />
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </Wrapper>
                </div>
            </div>
            <ConformationValidationModal
                open={openConfirmationValidationModal}
                setOpen={setOpenConfirmationValidationModal}
            />
        </ContainerFull>
    )
}
