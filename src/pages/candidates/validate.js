export const validate = values => {
    const errors = {};
    if (!values.nivel) {
        errors.nivel = 'Debes seleccionar un nivel para tu curso';
    }
    return errors;
};
