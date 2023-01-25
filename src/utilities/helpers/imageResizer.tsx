class Resizer {
  static changeHeightWidth(height: any, maxHeight: any, width: any, maxWidth: any, minWidth: any, minHeight: any) {
    let h = height;
    let w = width;
    if (width > maxWidth) {
      h = Math.round((height * maxWidth) / width);
      w = maxWidth;
    }
    if (height > maxHeight) {
      w = Math.round((width * maxHeight) / height);
      h = maxHeight;
    }
    if (minWidth && width < minWidth) {
      h = Math.round((height * minWidth) / width);
      w = minWidth;
    }
    if (minHeight && height < minHeight) {
      w = Math.round((width * minHeight) / height);
      h = minHeight;
    }
    return { h, w };
  }

  static resizeAndRotateImage(
    image: any,
    maxWidth: any,
    maxHeight: any,
    minWidth: any,
    minHeight: any,
    compressFormat = 'jpeg',
    quality = 100,
    rotation = 0,
  ) {
    const qualityDecimal = quality / 100;
    const canvas = document.createElement('canvas');

    let { width } = image;
    let { height } = image;

    const newHeightWidth = this.changeHeightWidth(height, maxHeight, width, maxWidth, minWidth, minHeight);
    if (rotation && (rotation === 90 || rotation === 270)) {
      canvas.width = newHeightWidth.h;
      canvas.height = newHeightWidth.w;
    } else {
      canvas.width = newHeightWidth.w;
      canvas.height = newHeightWidth.h;
    }

    width = newHeightWidth.w;
    height = newHeightWidth.h;

    const ctx = canvas.getContext('2d');
    if (ctx !== null) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx?.fillRect(0, 0, width, height);

      if (ctx.imageSmoothingEnabled && ctx.imageSmoothingQuality) {
        ctx.imageSmoothingQuality = 'high';
      }

      if (rotation) {
        ctx.rotate((rotation * Math.PI) / 180);
        if (rotation === 90) {
          ctx.translate(0, -canvas.width);
        } else if (rotation === 180) {
          ctx.translate(-canvas.width, -canvas.height);
        } else if (rotation === 270) {
          ctx.translate(-canvas.height, 0);
        } else if (rotation === 0 || rotation === 360) {
          ctx.translate(0, 0);
        }
      }
      ctx.drawImage(image, 0, 0, width, height);
    }
    if (compressFormat === 'svg+xml') {
      return image.src;
    }

    return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
  }

  static b64toByteArrays(b64Data: any, contentType: any) {
    const conType = contentType || 'image/jpeg';
    const sliceSize = 512;
    console.log(conType);
    const byteCharacters = atob(b64Data.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i + 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    return byteArrays;
  }

  static b64toBlob(b64Data: any, contentType: any) {
    const byteArrays = this.b64toByteArrays(b64Data, contentType);
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  static b64toFile(b64Data: any, fileName: any, contentType: any) {
    const byteArrays = this.b64toByteArrays(b64Data, contentType);
    const file = new File(byteArrays, fileName, { type: contentType });
    return file;
  }

  static createResizedImage(
    file: any,
    maxWidth: any,
    maxHeight: any,
    compressFormat: any,
    quality: any,
    rotation: any,
    responseUriFunc: any,
    outputType = 'base64',
    minWidth = null,
    minHeight = null,
  ) {
    const reader = new FileReader();
    if (file) {
      if (file.type && !file.type.includes('image')) {
        throw Error('File Is NOT Image!');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
            const resizedDataUrl = Resizer.resizeAndRotateImage(
              image,
              maxWidth,
              maxHeight,
              minWidth,
              minHeight,
              compressFormat,
              quality,
              rotation,
            );
            const contentType = `image/${compressFormat}`;
            switch (outputType) {
              case 'blob':
                {
                  const blob = Resizer.b64toBlob(resizedDataUrl, contentType);
                  responseUriFunc(blob);
                }
                break;
              case 'base64':
                responseUriFunc(resizedDataUrl);
                break;
              case 'file':
                {
                  const fileName = file.name;
                  const fileNameWithoutFormat = fileName.toString().replace(/(png|jpeg|jpg|webp)$/i, '');
                  const newFileName = fileNameWithoutFormat.concat(compressFormat.toString());
                  const newFile = Resizer.b64toFile(resizedDataUrl, newFileName, contentType);
                  responseUriFunc(newFile);
                }
                break;
              default:
                responseUriFunc(resizedDataUrl);
            }
          };
        };
        reader.onerror = (error: any) => {
          throw Error(error);
        };
      }
    } else {
      throw Error('File Not Found!');
    }
  }

  static imageFileResizer = (
    file?: any,
    maxWidth?: any,
    maxHeight?: any,
    compressFormat?: any,
    quality?: any,
    rotation?: any,
    responseUriFunc?: any,
    outputType?: any,
    minWidth?: any,
    minHeight?: any,
  ) =>
    Resizer.createResizedImage(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      responseUriFunc,
      outputType,
      minWidth,
      minHeight,
    );
}

const getFileType = (file: File) => {
  const type = file.type.split('/');
  return type[1];
};

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      getFileType(file),
      100,
      0,
      (uri: any) => {
        resolve(uri);
        return uri;
      },
      'base64',
      200,
      200,
    );
  });

const imageResize = async (file: File) => {
  try {
    const resFile = await resizeFile(file);
    return resFile;
  } catch (err) {
    throw new Error('Return error');
  }
};
export { imageResize };

export const validImage = (submittedImage: File) => {
  const isJPG = submittedImage.type === 'image/jpeg';
  const isJPEG = submittedImage.type === 'image/jpg';
  const isPNG = submittedImage.type === 'image/png';
  const isWebpic = submittedImage.type === 'image/webp';
  const isSVG = submittedImage.type === 'image/svg+xml' || submittedImage.type === 'image/svg';
  return isJPG || isJPEG || isPNG || isSVG || isWebpic;
};
