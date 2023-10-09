import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { EmotionCache } from '@emotion/react';

// Components
import Layout from '@/components/Layout/Layout';

// Hooks
import useLanguage from '@/hooks/useLanguage.hook';

// Providers
import PageProvider from '@/providers/PageProvider';

// Styles
import '@/styles/globals.css';

// Types
import { Language } from '@/types/shared.types';

// Utils
import createEmotionCache from '@/utils/create-emotion-cache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('language')) {
      changeLanguage(localStorage.getItem('language') as Language);
    }
  }, []);

  return (
    <PageProvider emotionCache={emotionCache}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PageProvider>
  );
}

export default appWithTranslation(App);
