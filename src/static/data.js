export const userData = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://res.cloudinary.com/dax0v05jz/image/upload/v1708645791/uploads/hbzdzch5ldxw6pszwmej.png',
}


const allAccess = ['estudiante', 'profesor', 'control escolar', 'administrativo', 'desarrollador' ,'director', 'subdirector', 'coordinador', 'ventas', 'cobranza','invitado'];

const onlyCandidate = ['control escolar', 'administrativo', 'desarrollador' ,'director', 'subdirector', 'coordinador' ];

const onlyCourse = ['estudiante', 'profesor', 'administrativo', 'desarrollador' ,'director', 'subdirector'];

const onlyUsers = ['administrativo', 'desarrollador' ,'director', 'subdirector'];

const onlyStudents = ['administrativo', 'desarrollador' ,'director', 'subdirector'];

const onlyPayment = [];
// const onlyPayment = ['estudiante', 'control escolar', 'administrativo', 'desarrollador' ,'director', 'subdirector', 'ventas', 'cobranza','invitado'];

export const navigation = [
    { name: 'Inicio', href: '/', access: allAccess },
    { name: 'Candidatos', href: '/candidatos', access: onlyCandidate },
    { name: 'Cursos', href: '/cursos', access: onlyCourse },
    { name: 'Usuarios', href: '/usuarios', access: onlyUsers },
    { name: 'Alumnos', href: '/alumnos', access: onlyStudents },
    { name: 'Pagos', href: '/pagos', access: onlyPayment },
];

export const userNavigation = [
    { name: 'Perfil', href: '/mi-perfil' },
    { name: 'Configuracion', href: '/ajustes' },
]

export const userMenu = [
    { name: 'Perfil', description: 'Edita y actuliza tu perfil de usuario.', href: 'mi-perfil', icon: "UserIcon" },
    { name: 'Configuracion', description: 'Personalizar la configuración de la aplicación', href: 'ajustes', icon: "Cog8ToothIcon" },
    { name: 'Notificaciones', description: "Administrar las notificaciones de la aplicación", href: 'notificaciones', icon: "BellIcon" },
    { name: 'Cursos', description: 'Ver y gestionar tus cursos.', href: 'cursos', icon: "BookOpenIcon" },
    { name: 'Tareas', description: 'Acceder y completar las tareas asignadas', href: 'tareas', icon: "RectangleStackIcon" },
]


export const locationState = [
    { value: "Aguascalientes", description: "Aguascalientes" },
    { value: "Baja California", description: "Baja California" },
    { value: "Baja California Sur", description: "Baja California Sur" },
    { value: "Campeche", description: "Campeche" },
    { value: "Coahuila", description: "Coahuila" },
    { value: "Colima", description: "Colima" },
    { value: "Chiapas", description: "Chiapas" },
    { value: "Chihuahua", description: "Chihuahua" },
    { value: "Ciudad de México", description: "Ciudad de México" },
    { value: "Durango", description: "Durango" },
    { value: "Guanajuato", description: "Guanajuato" },
    { value: "Guerrero", description: "Guerrero" },
    { value: "Hidalgo", description: "Hidalgo" },
    { value: "Jalisco", description: "Jalisco" },
    { value: "Estado de México", description: "Estado de México" },
    { value: "Michoacán", description: "Michoacán" },
    { value: "Morelos", description: "Morelos" },
    { value: "Nayarit", description: "Nayarit" },
    { value: "Nuevo León", description: "Nuevo León" },
    { value: "Oaxaca", description: "Oaxaca" },
    { value: "Puebla", description: "Puebla" },
    { value: "Querétaro", description: "Querétaro" },
    { value: "Quintana Roo", description: "Quintana Roo" },
    { value: "San Luis Potosí", description: "San Luis Potosí" },
    { value: "Sinaloa", description: "Sinaloa" },
    { value: "Sonora", description: "Sonora" },
    { value: "Tabasco", description: "Tabasco" },
    { value: "Tamaulipas", description: "Tamaulipas" },
    { value: "Tlaxcala", description: "Tlaxcala" },
    { value: "Veracruz", description: "Veracruz" },
    { value: "Yucatán", description: "Yucatán" },
    { value: "Zacatecas", description: "Zacatecas" }
];


export const levelEducation = [
    { value: "Primaria", description: "Primaria" },
    { value: "Secundaria", description: "Secundaria" },
    { value: "Bachillerato o preparatoria", description: "Bachillerato o preparatoria" },
    { value: "Educación técnica o profesional", description: "Educación técnica" },
    { value: "Licenciatura", description: "Licenciatura" },
    { value: "Maestría", description: "Maestría" },
    { value: "Doctorado", description: "Doctorado" },
];

export const languages = [
    { value: "ingles", description: "ingles" },
    { value: "frances", description: "frances" },
    { value: "japones", description: "japones" },
];


export const accounts = [
    { value: "9801 9878 0978 0919", description: "9801 9878 0978 0919" },
    { value: "9878 9889 0019 0918", description: "9878 9889 0019 0918" },
    { value: "9232 2200 1100 0010", description: "9232 2200 1100 0010" },
    { value: "9078 9890 0912 1230", description: "9078 9890 0912 1230" },
];

export const typeUserOptions = [
    { value: "director", description: "director" },
    { value: "subdirector", description: "subdirector" },
    { value: "administrativo", description: "administrativo" },
    { value: "desarrollador", description: "desarrollador" },
    { value: "control escolar", description: "control escolar" },
    { value: "coordinador", description: "coordinador" },
    { value: "cobranza", description: "cobranza" },
    { value: "ventas", description: "ventas" },
    { value: "profesor", description: "profesor" },
    { value: "estudiante", description: "estudiante" },
];

export const nivels = [
    { value: "nivel 1", description: "nivel 1" },
    { value: "nivel 2", description: "nivel 2" },
    { value: "nivel 3", description: "nivel 3" },
    { value: "nivel 4", description: "nivel 4" },
];

export const colors = [
    { name: 'red', clase: 'bg-red-600', selectedClass: 'ring-red-600 shadow-red-500' },
    { name: 'orange', clase: 'bg-orange-500', selectedClass: 'ring-orange-500 shadow-orange-500' },
    { name: 'yellow', clase: 'bg-yellow-400', selectedClass: 'ring-yellow-400 shadow-yellow-500' },
    { name: 'green', clase: 'bg-lime-600', selectedClass: 'ring-lime-600 shadow-lime-500' },
    { name: 'blue', clase: 'bg-sky-500', selectedClass: 'ring-sky-500 shadow-sky-500' },
    { name: 'purple', clase: 'bg-purple-500', selectedClass: 'ring-purple-500 shadow-purple-500' },
]
