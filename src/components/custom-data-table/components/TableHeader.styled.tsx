import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  padding: '8px 15px 8px 15px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));
const Left = styled('div')(({ theme }) => ({
  display: 'flex',
  marginRight: 'auto',
  alignSelf: 'baseline',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-between',
  },
}));

const Right = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'end',
  flexWrap: 'wrap',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-between',
  },
}));

interface PropTableHeader {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const TableHeader = ({ left, right }: PropTableHeader) => (
  <Container>
    <Left>{left}</Left>
    <Right>{right}</Right>
  </Container>
);
