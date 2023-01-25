export const parseToISO = (date: any) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const dateISO = new Date(date - tzoffset).toISOString().slice(0, -1);
  return dateISO;
};
