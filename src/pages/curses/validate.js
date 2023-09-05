export const validateCreateCurse = values => {
    const errors = {};
    if (!values.assessor) {
        errors.assessor = 'Debes asignar un assesor al pre registro';
    }
    return errors;
};
