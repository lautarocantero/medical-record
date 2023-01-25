export const getFileExtension = (file: any) => file.name.split('.').pop().toLowerCase();

export const getBase64Value = (fileReader: any) => fileReader.result.replace(/^data:image\/[a-z]+;base64,/, '');

export const convertFileInBase64 = (event: any) =>
  new Promise((resolve, reject) => {
    const inputFile = event.target.files[0];
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onloadend = () => {
      resolve({
        extension: getFileExtension(inputFile),
        url: temporaryFileReader.result,
        base64Value: getBase64Value(temporaryFileReader),
      });
    };
    temporaryFileReader.onerror = () => {
      reject();
    };
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
  });

export const readFile = (event: any) =>
  new Promise((resolve, reject) => {
    const inputFile = event.target;
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onload = async (e) => {
      const text = e?.target?.result;
      return text;
    };
    temporaryFileReader.readAsText(inputFile);
    temporaryFileReader.onerror = () => {
      reject();
    };
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
  });

export const readFileTyC = (event: any) =>
  new Promise((resolve, reject) => {
    const inputFile = event.target.files[0];
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onloadend = () => {
      resolve({
        extension: getFileExtension(inputFile),
        base64Value: `${temporaryFileReader?.result}`.replace(/^data:.+;base64,/, ''),
      });
    };
    temporaryFileReader.onerror = () => {
      reject();
    };
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
  });

export const readImages = (event: any) =>
  new Promise((resolve, reject) => {
    const inputFile = event.target.files[0];
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onloadend = () => {
      resolve({
        extension: getFileExtension(inputFile),
        url: temporaryFileReader.result,
        base64Value: getBase64Value(temporaryFileReader),
        imageBase64: getBase64Value(temporaryFileReader),
      });
    };
    temporaryFileReader.onerror = () => {
      reject();
    };
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
  });

export const readPdfFeed = (event: any) =>
  new Promise((resolve, reject) => {
    const inputFile = event.target.files[0];
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onloadend = () => {
      resolve({
        name: inputFile.name,
        extension: getFileExtension(inputFile),
        base_64_format: `${temporaryFileReader.result}`.split(',')[1],
        docBase64: `${temporaryFileReader.result}`.split(',')[1],
      });
    };
    temporaryFileReader.onerror = () => {
      reject();
    };
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
  });

export const readPdfFileTwo = (value: any) =>
  new Promise((resolve, reject) => {
    const inputFile = value;
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onloadend = () => {
      resolve({
        name: inputFile.name,
        extension: getFileExtension(inputFile),
        image_base_64: `${temporaryFileReader.result}`.split(',')[1],
        ImageBase64: `${temporaryFileReader.result}`.split(',')[1],
      });
    };
    temporaryFileReader.onerror = () => {
      reject();
    };
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
  });

export const isFileTooLong = (long: number) => {
  if (long > 10485760) {
    return true;
  }
  return false;
};
