export const  formatDate = (inputDate) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const date = new Date(inputDate);
    return date.toLocaleDateString('es-ES', options);
  }
  
//   const originalDate = "Mon Oct 09 2023 00:00:00 GMT-0600 (Central Standard Time)";
//   const formattedDate = formatDate(originalDate);
  
//   console.log("Formatted Date:", formattedDate);