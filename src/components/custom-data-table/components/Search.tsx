import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const SearchStyled = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px rgb(145, 158, 171)`,
  marginLeft: 0,
  position: 'relative',
  width: '100%',
  '&:hover': {
    border: `solid 1px ${theme.palette.primary.main}`,
  },
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'rgb(145, 158, 171)',
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
  position: 'absolute',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    paddingTop: '3%',
    alignSelf: 'center',
    transition: theme.transitions.create('width'),
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'rgb(145, 158, 171)',
    },
    width: '100%',
  },
}));

const Search = ({ handleSearchChange, disabled }: any) => {
  const { t } = useTranslation();
  return (
    <SearchStyled>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        disabled={disabled}
        placeholder={t('search_bar')}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearchChange}
      />
    </SearchStyled>
  );
};

export default Search;
