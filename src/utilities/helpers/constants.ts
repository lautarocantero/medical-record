export const VALID_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
export const VALID_NUMBER_FIELD = /^\d+$/;
export const VALID_STRING_FIELD = /[^A-Za-z ]$/;
export const VALID_EMAIL_REGEX = /[A-Za-z0-9_%+-]+@[a-z0-9-]+\.[a-z]{1,4}\S$/g;
export const VALID_NUMBER_FIELD_WITH_PREFIX =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
export const VALID_FUNCTIONAL_UNIT = /[^0-9A-Za-z-]/;
export const NUMBER_REGEX = /[^0-9]/;
export const ALFANUMERICO_REGEX = /[^a-z0-9]/gi;
