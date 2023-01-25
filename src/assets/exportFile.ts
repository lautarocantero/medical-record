import { useState } from 'react';
import getEnvVariables from '../utilities/helpers/getEnvVariables';
import EventBackgroundPattern from './common/logos/eventBackgroundPattern.svg';
import pdfIconImage from './common/logos/pdfFile.svg';

const { VITE_TENANT_NAME } = getEnvVariables();

const getUrlToImport = (path: string) => {
  switch (path) {
    case 'images/loginBackground':
      return import(`./${VITE_TENANT_NAME}/images/loginBackground.png`);
    case 'logos/mainLogo':
      return import(`./${VITE_TENANT_NAME}/logos/mainLogo.svg`);
    case 'logos/whiteLogo':
      return import(`./${VITE_TENANT_NAME}/logos/whiteLogo.png`);
    case 'logos/headLogo':
      return import(`./${VITE_TENANT_NAME}/logos/headLogo.png`);
    default:
      return null;
  }
};

const useGetAssetSrc = (path: string) => {
  const [url, setUrl] = useState('');

  const importedAsset = getUrlToImport(path);
  importedAsset?.then((module) => {
    setUrl(module.default);
  });

  return url;
};

export const useExportAssets = () => {
  const backgroundPic = useGetAssetSrc(`images/loginBackground`);
  const mainLogo = useGetAssetSrc(`logos/mainLogo`);
  const whiteLogo = useGetAssetSrc(`logos/whiteLogo`);
  const headLogo = useGetAssetSrc(`logos/headLogo`);
  const EventBackgroundPatternImage = EventBackgroundPattern;
  const pdfIcon = pdfIconImage;
  return { backgroundPic, mainLogo, whiteLogo, headLogo, EventBackgroundPatternImage, pdfIcon };
};
