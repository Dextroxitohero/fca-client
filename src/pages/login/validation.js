export const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'El correo electronico es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'El correo no es valido';
    }

    if (!values.password) {
        errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
        errors.password = 'La contraseña de debe contener al menos 6 caracteres.';
    }

    return errors;
};
