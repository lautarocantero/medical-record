import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CapitalizeFirstLetter } from '../../utilities/helpers/capitalizeFirstLetter';
import { metaTagDesc } from './metaTagsDescription';
import getEnvVariables from '@/src/utilities/helpers/getEnvVariables';
import { useExportAssets } from '@/src/assets/exportFile';

const HelmetLayout = () => {
  const location = useLocation();
  const titleTag = location.pathname.substring(1).replace('-', ' ').replace('/', ' ');
  const index = titleTag.indexOf(' ');
  const objKey = index === -1 ? titleTag : titleTag.slice(0, index);
  const title = CapitalizeFirstLetter(titleTag);
  const { VITE_PROJECT_HEAD } = getEnvVariables();
  const { headLogo } = useExportAssets();
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={headLogo} />
        <title>
          {VITE_PROJECT_HEAD} | {title}
        </title>
        <meta property="og:title" name={title} content={metaTagDesc[objKey as keyof typeof metaTagDesc]} />
      </Helmet>
      <Outlet />
    </>
  );
};

export default HelmetLayout;
