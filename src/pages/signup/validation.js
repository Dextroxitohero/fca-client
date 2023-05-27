export const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Tu nombre es requerido';
    } else if (values.firstName.length < 4) {
        errors.firstName = 'El nombre debe contener al menos 4 letras';
    }

    if (!values.lastName) {
        errors.lastName = 'Tu apellido es requerido';
    } else if (values.lastName.length < 4) {
        errors.lastName = 'El apellido paterno debe contener al menos 4 letras';
    }

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

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }

    return errors;
};
