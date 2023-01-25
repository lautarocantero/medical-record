import { useState } from 'react';
import { axiosAuthenticationInstance } from '@/src/api/instances/authInstance';

const useEdit = (resource: string) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);
  const onEdit = (id: string) => {
    const onEditAsync = async () => {
      setStatus('pending');
      try {
        const response = await axiosAuthenticationInstance.get(`v1/${resource}/${id}`);
        const resp = response.data;

        if (resource === 'admin-accounts') setData(resp.admin);
        else setData(resp[resource.replace('-', '_')]);
        setStatus('fulfilled');
      } catch (e: any) {
        setStatus('rejected');
      }
    };
    onEditAsync();
  };

  return { data, onEdit, status };
};

export default useEdit;
