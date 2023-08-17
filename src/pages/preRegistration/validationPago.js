export const validate = values => {
    const errors = {};
    if (!values.account) {
        errors.account = 'Seleccione la cuenta que utilizo para hacer su pago';
    } 
    if (!values.assessor) {
        errors.assessor = 'Seleccione un assesor';
    } 
    if (values.file === null) {
        errors.file = 'Seleccione su comprobante de pago';
    } 

    return errors;
};

