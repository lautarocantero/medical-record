export const capitalizeFirstLetter = (string: string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const lowerFirsLetter = (string: string) => `${string.charAt(0).toLowerCase()}${string.slice(1)}`;

export const formatPhoneNumber = (phoneNumber: string) => {
  const phoneNumberSplitted = phoneNumber?.split(' ');
  const country = phoneNumberSplitted[0];
  const area = phoneNumberSplitted[1];
  const number = phoneNumberSplitted[2];
  switch (country) {
    case '+1':
      return `${country} (${area}) ${number.slice(0, 4)}-${number.slice(4)}`;
    case '+549':
      return `${country.slice(0, 3)} ${country.charAt(3)} ${area} ${number.slice(0, 4)} ${number.slice(4)}`;
    default:
      return phoneNumber;
  }
};

export const toUpperCase = (str: string) => str.toUpperCase();

export const zeroFill = (value: string, width: number) => {
  const zeroQuantity = width - value.toString().length;
  if (zeroQuantity > 0) {
    return new Array(zeroQuantity + (/\./.test(value) ? 2 : 1)).join('0') + value;
  }
  return `${value}`;
};

export const isValidDigit = (keyCode: number) => (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90);
