import { useMutation } from '@tanstack/react-query';
import { axiosAuthenticationInstance } from '@/src/api/instances/authInstance';
import axiosAnonInstanceFake from '@/src/api/instances/anonInstancesFake';

const useDisable = (resource: string, isDisabled: boolean, fake?: boolean) => {
  const instance = fake ? axiosAnonInstanceFake : axiosAuthenticationInstance;
  const disableRecord = (id: number) =>
    instance.put(`v1/${resource}/${id}/set-availability`, { disabled: !isDisabled });
  const { mutate: mutateDisable, isLoading } = useMutation(disableRecord);

  return { mutateDisable, isLoading };
};

export default useDisable;
