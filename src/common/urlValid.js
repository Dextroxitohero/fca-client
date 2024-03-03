export const validUrl = (enlace) => {
    if (enlace === '') return false;
    // Expresión regular para validar una URL
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;

    try {
        new URL(enlace);
        return regex.test(enlace);
    } catch (error) {
        return false;
    }
}