import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useSnackBar from '@/src/components/custom-snackbar/useSnackBar';
import { axiosAuthenticationInstance } from '@/src/api/instances/authInstance';

const getAdditionalInfo = async ({ resource, userId }: { resource: string; userId: string }) => {
  const response = await axiosAuthenticationInstance.get(
    `v1/customers/${userId}/${resource}?page=${0}&pageSize=${10}&orderField=${1}`,
  );
  return response.data;
};

export const useGetAdditionalData = (resource: string, userId: string) => {
  const { SnackBar, setHasError, setMessage, setOpen } = useSnackBar();
  const { data, error, isError, isLoading, isFetching } = useQuery(
    [`${resource}${userId}`],
    () => getAdditionalInfo({ resource, userId }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (isError) {
      setOpen(true);
      setHasError(true);
      setMessage('The request could not be complete.');
    }
  }, [isError, setHasError, setMessage, setOpen]);

  return { SnackBar, data, error, isFetching, isLoading };
};
