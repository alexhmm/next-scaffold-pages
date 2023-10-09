import { useState } from 'react';
import { useQuery } from 'react-query';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, CircularProgress, Typography } from '@mui/material';

// Components
import Post from './components/Post';

// Hooks
import useFetch from '@/hooks/use-fetch.hook';
import usePosts from './hooks/use-posts.hook';

// Styles
import styles from './Posts.module.scss';

// Types
import { Planet } from './types/posts.types';

export default function Pages(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { handleError, handleRetry } = useFetch();
  const { getPlanets } = usePosts();
  const { t } = useTranslation();

  // Page state
  const [planets, setPlanets] = useState<Planet[]>([]);

  // ####### //
  // QUERIES //
  // ####### //

  // Get playlist on component mount.
  // eslint-disable-next-line
  const planetsQuery = useQuery('planets', () => getPlanets(), {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      const errRes = error?.response;
      if (errRes) {
        console.error('Error on getting album:', error);
        handleError(errRes.status);
      }
    },
    onSuccess: (data) => {
      if (data) {
        if (data.results) {
          setPlanets(data.results);
        }
      }
    },
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
  });

  return (
    <>
      <Head>
        <title>Scaffold Pages • {t('posts:title')}</title>
      </Head>
      <Box className={styles['posts']}>
        <Typography className={styles['posts-title']} variant="h5">
          {t('posts:title')}
        </Typography>
        {planetsQuery.isLoading && <CircularProgress />}
        {planets.length > 0 && (
          <div className={styles['posts-content']}>
            {planets.map((planet) => (
              <Post key={planet.name} planet={planet} />
            ))}
          </div>
        )}
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'posts'])),
  },
});
