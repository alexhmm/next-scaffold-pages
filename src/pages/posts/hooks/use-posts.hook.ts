// Hooks
import useFetch from '@/hooks/use-fetch.hook';

// Types
import { GetPostsResponse, Planet } from '../types/posts.types';

const usePosts = () => {
  const { fetchData } = useFetch();
  /**
   * Get planets.
   */
  const getPlanets = async (): Promise<
    GetPostsResponse<Planet> | undefined
  > => {
    return await fetchData('planets');
  };

  return {
    getPlanets,
  };
};

export default usePosts;
