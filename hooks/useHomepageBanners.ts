import { homepageBannersService, type HomepageBannerRecord } from '../services/homepageBanners';
import { useFetch } from './useFetch';

const REFRESH_INTERVAL_MS = 60_000;

export function useHomepageBanners() {
  const { data, loading, error } = useFetch<HomepageBannerRecord[]>(
    () => homepageBannersService.list(),
    {
      initialData: [],
      cacheKey: 'public:homepage-banners:list',
      cacheTtlMs: 60_000,
      refreshIntervalMs: REFRESH_INTERVAL_MS,
      revalidateOnFocus: true,
      revalidateOnVisibility: true,
    },
  );

  return { banners: data, loading, error };
}
