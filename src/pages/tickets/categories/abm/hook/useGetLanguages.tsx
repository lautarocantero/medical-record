import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getsLanguages } from '@/src/api/endpoints/master';

export interface Lang {
  id: number;
  code: string;
}

export const getCodes = (lang: Lang) => {
  const code = lang.code.split('-');
  return code[1].toLocaleLowerCase();
};

export const useGetLanguages = () => {
  const [codes, setCodes] = useState<Array<string> | Array<any>>([]);
  const { data, isLoading } = useQuery({ queryKey: ['languages'], queryFn: () => getsLanguages() });

  useEffect(() => {
    if (data && data.data.languages.length > 0) {
      const cds = [];
      for (const i of data.data.languages) {
        cds.push(getCodes(i));
      }
      setCodes(cds);
    }
  }, [data]);

  return { languages: data?.data.languages, codes, isLoading };
};
