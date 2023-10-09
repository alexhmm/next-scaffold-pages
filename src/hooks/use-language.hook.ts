import { useCallback } from 'react';
import { useRouter } from 'next/router';

// Types
import { Language } from '@/types/shared.types';

const useLanguage = () => {
  const router = useRouter();

  /**
   * Change language by locale string.
   * @param lng Locale string
   */
  const changeLanguage = useCallback(
    (lng: Language) => {
      localStorage.setItem('language', lng);
      router.push(`${router.asPath}`, `${router.asPath}`, { locale: lng });
    },
    [router.pathname]
  );

  return {
    changeLanguage,
  };
};

export default useLanguage;
