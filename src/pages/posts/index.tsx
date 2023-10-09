import { FC, ReactNode } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Typography } from '@mui/material';

// Styles
import styles from './Posts.module.scss';

export default function Imprint(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Scaffold Pages • {t('posts:title')}</title>
      </Head>
      <Box className={styles['posts']}>
        <Typography variant="h5">{t('posts:title')}</Typography>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'posts'])),
  },
});
