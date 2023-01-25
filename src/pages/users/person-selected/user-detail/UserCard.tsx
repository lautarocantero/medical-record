import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Chip, Divider, Typography } from '@mui/material';
import { getFormattedDateFullYearEs, getFormattedDateFullYearEn } from '@/src/utilities/helpers/dateParser';
import { FadeIn } from '@/src/components/animations';
import { getLanguage } from '@/src/utilities/storage';
import { UserCardWrapper, UserCardInfoWrapper } from './User.styled';
import { UserCardProps } from './types';

const UserCard = ({ values }: UserCardProps) => {
  const currentDate = new Date();
  const { t } = useTranslation();
  const TextContainer = ({ first, second }: { first: string; second: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
      <Typography variant="subtitle2" component="span" fontSize="13px" fontWeight="600" sx={{ marginRight: '3.5px' }}>
        {t(first)}:
      </Typography>
      <Typography variant="body2" component="span" fontSize="14px" fontWeight="400">
        {t(second)}
      </Typography>
    </Box>
  );

  const lang = getLanguage()?.split('-')[0];
  const getFormattedDateNumbeByLanguague = (date: number) =>
    lang === 'es' ? getFormattedDateFullYearEs(date) : getFormattedDateFullYearEn(date);
  return (
    <UserCardWrapper>
      <FadeIn duration="1.5s">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt={`${values.name} ${values.surname}`}
            src={values.avatarSrc}
            sx={{ width: '6rem', height: '6rem', my: 'auto' }}
          />
          <Typography gutterBottom variant="h6" fontSize="18px" fontWeight="500" textAlign="center">
            {`${values.name} ${values.surname}`}
          </Typography>
          <Chip
            size="small"
            color={`${values.isDisabled ? 'error' : 'success'}`}
            label={values.isDisabled ? t('disabled') : t('enable')}
          />
        </Box>
      </FadeIn>
      <UserCardInfoWrapper>
        <div>
          <Typography fontSize="16px" fontWeight="600">
            {t('detail', { ns: 'customerUsers' })}
          </Typography>
          <Divider sx={{ mt: '2px', mb: '5px' }} />
          <TextContainer first="Email" second={values.email} />
          <TextContainer
            first={t('residents_list_phone_number_column', { ns: 'customerUsers' })}
            second={`${values.countryCode} ${values.areaCode} ${values.phoneNumber}`}
          />
          <TextContainer first={t('gender', { ns: 'customerUsers' })} second={values.gender} />
          <TextContainer
            first={t('birthday', { ns: 'customerUsers' })}
            second={getFormattedDateNumbeByLanguague(values.birthday)}
          />
        </div>

        <div>
          <Typography fontSize="16px" fontWeight="600">
            {t('property_code_other', { ns: 'customerUsers' })}
          </Typography>
          <Divider sx={{ mt: '2px', mb: '5px' }} />
          {values.properties.map((property: any, index: number) =>
            +currentDate <= property.to ? (
              <Fragment key={index}>
                <TextContainer first={t('user_detail_apartment', { ns: 'customerUsers' })} second={property.code} />
                <TextContainer
                  first={t('date')}
                  second={`${getFormattedDateNumbeByLanguague(property.from)} - ${getFormattedDateNumbeByLanguague(
                    property.to,
                  )}`}
                />
              </Fragment>
            ) : (
              <span key={index}>-</span>
            ),
          )}
        </div>
      </UserCardInfoWrapper>
    </UserCardWrapper>
  );
};

export default UserCard;
