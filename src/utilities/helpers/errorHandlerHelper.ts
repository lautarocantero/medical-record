const refactResponseHelper = (data: any) => {
  if (!data) {
    const payload = { code: 'NoURLService', error_messages: 'No service available' };
    return payload;
  }

  if (data.error_messages && data.error_messages.constructor === Array) {
    const payload = {
      code: data.error_messages[0].code || 'NothingFound',
      error_messages: data.error_messages[0].message || data.error_messages[0],
    };
    return payload;
  }

  if (data && data.error) {
    const payload = { code: data.error.code, error_messages: data.error.message };
    return payload;
  }

  if (data && data.errors) {
    const payload = { code: 'BadRequest', error_messages: data.title };
    return payload;
  }
};

export const errorHandlerHelper = ({ response }: any) => {
  const payload = refactResponseHelper(response?.data);
  const { status } = response;
  switch (status) {
    case 400:
    case 401:
    case 402:
    case 403:
    case 404:
    case 405:
    case 422:
    case 500:
      return payload;

    default:
      break;
  }
};
