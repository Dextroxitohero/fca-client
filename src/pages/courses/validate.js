export const validateCreateCurse = values => {
    const errors = {};
    if (values.color === '') {
        errors.color = 'Selecciona un color';
    }
    if (!values.language) {
        errors.language = 'Selecciona un idioma';
    }
    if (!values.nivel) {
        errors.nivel = 'Selecciona un nivel para el curso';
    }
    if (values.limit > 1) {
        errors.limit = 'Debes asignar un assesor al pre registro';
    }
    return errors;
};
