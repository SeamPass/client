export const convertDate = (dateStr: string): string => {
  const dateObj = new Date(dateStr);

  const formattedDate = `${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObj
    .getDate()
    .toString()
    .padStart(2, "0")}/${dateObj.getFullYear()}`;

  return formattedDate;
};
