export const CustomInputStyles = (disabled: any) => {
  const styles = {
    input: {
      WebkitTextFillColor: disabled ? 'rgba(0,0,0,0.6) !important' : '',
      color: disabled ? 'rgba(0,0,0,0.7) !important' : '',
      opacity: disabled ? 0.7 : '',
      backgroundColor: disabled ? 'rgba(0,0,0,0.05) ' : '',
    },
    label: {
      color: disabled ? 'rgba(0,0,0,1) !important' : '',
    },
  };
  return styles;
};
