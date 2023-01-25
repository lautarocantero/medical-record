import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UseGetCounterInformation {
  endpoint: () => Promise<AxiosResponse<any, any>>;
  key: string;
  doRefetch?: boolean;
  refetchTime?: number;
}

export const useGetCounterOnIcons = ({ key, endpoint, doRefetch, refetchTime = 5 }: UseGetCounterInformation) => {
  const { data, refetch } = useQuery({ queryKey: [key], queryFn: endpoint, onError: () => {} });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (data && data.data?.count) {
      setCount(data.data.count);
      localStorage.setItem(key, JSON.stringify(data.data.count));
    }
  }, [data]);

  useEffect(() => {
    if (doRefetch) {
      const timeset = 1000 * 60 * refetchTime;
      const doingRefetch = setInterval(() => {
        refetch();
      }, timeset);

      return () => clearInterval(doingRefetch);
    }
  }, [doRefetch]);

  return {
    count,
  };
};
