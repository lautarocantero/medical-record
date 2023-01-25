import { useMutation } from '@tanstack/react-query';
import { axiosAuthenticationInstance } from '@/src/api/instances/authInstance';
import axiosAnonInstanceFake from '@/src/api/instances/anonInstancesFake';

const useDelete = (fake: boolean, pathApi: string) => {
  const instance = fake ? axiosAnonInstanceFake : axiosAuthenticationInstance;
  const deleteRecord = (id: number) => instance.delete(`${pathApi}/${id}`);
  const { mutate: mutateDelete, isLoading } = useMutation(deleteRecord);

  return { mutateDelete, isLoading };
};

export default useDelete;
