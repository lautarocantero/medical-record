import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Menu, MenuItem } from '@mui/material';
import { FlagWrapper, CustomFab } from './Language.styled';
import EsFlagIcon from '@/src/assets/common/images/countries/esFlag';
import UsFlagIcon from '@/src/assets/common/images/countries/usFlag';

const FlagOption = ({
  flag,
  lang,
  onChangeLenguaje,
}: {
  flag: string;
  lang: string;
  onChangeLenguaje: (language: string) => void;
}) => (
  <MenuItem onClick={() => onChangeLenguaje(lang)}>
    <FlagWrapper>
      {flag === 'us' ? <UsFlagIcon /> : <EsFlagIcon />}
      <Box>{lang}</Box>
    </FlagWrapper>
  </MenuItem>
);

export const LanguageModal = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const languageOptions = [
    { lang: t('en', { ns: 'translation' }), flag: 'us' },
    { lang: t('es', { ns: 'translation' }), flag: 'es' },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeLanguage = (option: string) => {
    if (option === 'Ingles') {
      i18n.changeLanguage('en');
    } else if (option === 'Spanish') {
      i18n.changeLanguage('es');
    }
    handleClose();
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <CustomFab
        color="inherit"
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        size="small"
        onClick={handleMenu}
      >
        {i18n.language === 'en' ? <UsFlagIcon /> : <EsFlagIcon />}
      </CustomFab>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        keepMounted
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        open={Boolean(anchorEl)}
      >
        {languageOptions?.map((option) => (
          <FlagOption key={option.lang} {...option} onChangeLenguaje={onChangeLanguage} />
        ))}
      </Menu>
    </>
  );
};
