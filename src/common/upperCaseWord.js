export const capitalizarPalabras = (str)=> {
  if(str === undefined || str === null || str === '') return str;
    // Dividir el string en palabras usando un espacio como separador    
    const palabras = str.split(' ');
  
    // Iterar a través de las palabras y capitalizar la primera letra de cada una
    const palabrasCapitalizadas = palabras.map((palabra) => {
      // Asegurarse de que la palabra no esté vacía
      if (palabra.length === 0) {
        return palabra; // Mantener palabras vacías como están
      }
  
      // Capitalizar la primera letra y mantener el resto de la palabra en minúsculas
      const primeraLetraMayuscula = palabra[0].toUpperCase();
      const restoPalabraMinusculas = palabra.slice(1).toLowerCase();
  
      // Combinar la primera letra mayúscula y el resto de la palabra en minúsculas
      return primeraLetraMayuscula + restoPalabraMinusculas;
    });
  
    // Unir las palabras capitalizadas en un solo string
    const resultado = palabrasCapitalizadas.join(' ');
  
    return resultado;
}

export const firstCapitalLetter = (word) => {
  if(word === undefined || word === null || word === '') return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}