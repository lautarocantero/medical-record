import { useQuery } from '@tanstack/react-query';
import { getArticleById, preFetchVideoUrl } from '@/src/api/endpoints/feed';

const getArticleByIdData = async (id: number) => {
  const response = await getArticleById(id);
  return response.data;
};

export const useGetArticlesById = (id: number) => {
  const {
    data: dataById,
    isLoading,
    refetch,
  } = useQuery([`${id}`, getArticleByIdData], () => getArticleByIdData(id), {
    cacheTime: 10000,
  });
  return { dataById, isLoading, refetch };
};

export const getVideoUrl = async (videoInfo: { file_name: string }) => {
  const response = await preFetchVideoUrl(videoInfo);
  return response.data;
};
