export const getDateFormat = (date, separator = ".") => {
  const newDate = new Date(date);
  let newFormatDate = newDate.getDate();
  let newFormatMonth = newDate.getMonth() + 1;
  let newFormatYear = newDate.getFullYear();
  if (newFormatDate < 10) newFormatDate = "0" + newFormatDate;
  if (newFormatMonth < 10) newFormatMonth = "0" + newFormatMonth;
  return `${newFormatDate}${separator}${newFormatMonth}${separator}${newFormatYear}`;
};

export const getTimeFormat = (date, separator = ":") => {
  const newDate = new Date(date);
  let newFormatHours = newDate.getHours();
  let newFormatMinutes = newDate.getMinutes();
  let newFormatSeconds = newDate.getSeconds();
  if (newFormatHours < 10) newFormatHours = "0" + newFormatHours;
  if (newFormatMinutes < 10) newFormatMinutes = "0" + newFormatMinutes;
  if (newFormatSeconds < 10) newFormatSeconds = "0" + newFormatSeconds;
  return `${newFormatHours}${separator}${newFormatMinutes}${separator}${newFormatSeconds}`;
};
