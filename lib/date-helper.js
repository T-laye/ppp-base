export function isValidDate(dateString) {
  const dateObject = new Date(dateString);
  return (
    dateObject instanceof Date &&
    !isNaN(dateObject) &&
    dateObject.toISOString().slice(0, 10) === dateString
  );
}


export function formatDateToISO(dateString) {
 const year = date.getFullYear();
 const month = String(date.getMonth() + 1).padStart(2, "0");
 const day = String(date.getDate()).padStart(2, "0");
 return `${year}-${month}-${day}`;
}