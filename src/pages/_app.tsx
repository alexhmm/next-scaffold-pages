import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/react';

// Providers
import PageProvider from '@/providers/PageProvider';

// Styles
import '@/styles/globals.css';

// Utils
import createEmotionCache from '@/utils/create-emotion-cache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <PageProvider emotionCache={emotionCache}>
      <Component {...pageProps} />
    </PageProvider>
  );
}
