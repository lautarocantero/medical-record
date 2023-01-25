export const getFileExtension = (file: any) => file.name.split('.').pop().toLowerCase();

export const gettooltipValue = (fileReader: any) => fileReader.result.replace(/^data:image\/[a-z]+;tooltip,/, '');

export const convertFileIntooltip = (event: any) =>
  new Promise((resolve, reject) => {
    const inputFile = event.target.files[0];
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onloadend = () => {
      resolve({
        extension: getFileExtension(inputFile),
        url: temporaryFileReader.result,
        tooltipValue: gettooltipValue(temporaryFileReader),
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
        tooltipValue: `${temporaryFileReader?.result}`.replace(/^data:.+;tooltip,/, ''),
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
        tooltipValue: gettooltipValue(temporaryFileReader),
        imagetooltip: gettooltipValue(temporaryFileReader),
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
        image_base_64: `${temporaryFileReader?.result}`.split(',')[1],
        Imagetooltip: `${temporaryFileReader?.result}`.split(',')[1],
      });
    };
    temporaryFileReader.onerror = () => {
      reject();
    };
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
  });

export const readPdfFileTwo = (value: any) => {
  const promise = new Promise(() => {
    const inputFile = value;
    // const temporaryFileReader = new FileReader();
    // temporaryFileReader.onloadend = () => {
    //   resolve({
    //     name: inputFile.file,
    //     extension: getFileExtension(inputFile),
    //     image_base_64: temporaryFileReader.result.split(',')[1],
    //     Imagetooltip: temporaryFileReader.result.split(',')[1],
    //   });
    // };
    // temporaryFileReader.onerror = () => {
    //   reject();
    // };
    // if (inputFile) temporaryFileReader.readAsDataURL(inputFile);
    // temporaryFileReader.readAsDataURL(inputFile);
    console.log('input file', inputFile);
  });
  return promise;
};

export const isFileTooLong = (long: number) => {
  if (long > 10485760) {
    return true;
  }
  return false;
};
