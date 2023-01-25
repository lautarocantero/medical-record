import { useState } from 'react';
import SendMail from './send-mail/SendMail';
import Confirmation from './confirmation/Confirmation';
import useSnackBar from '@/src/components/custom-snackbar/useSnackBar';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState('');
  const { SnackBar } = useSnackBar();

  return (
    <>
      {emailSent ? <Confirmation emailSent={emailSent} /> : <SendMail onSuccess={setEmailSent} />}
      <SnackBar />
    </>
  );
};

export default ForgotPassword;
