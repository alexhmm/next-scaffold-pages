import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';
import { Button, Typography } from '@mui/material';

// Hooks
import useLanguage from '@/hooks/use-language.hook';

// Styles
import styles from './Home.module.scss';

// Types
import { Language } from '@/types/shared.types';

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { changeLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const { i18n, t } = useTranslation();

  return (
    <>
      <Head>
        <title>Scaffold Pages</title>
      </Head>
      <main className={styles['home']}>
        <Typography variant="h5">{t('home:title')}</Typography>
        <Button
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          Theme
        </Button>
        <Button
          onClick={() =>
            changeLanguage(
              i18n.language === Language.English
                ? Language.German
                : Language.English
            )
          }
        >
          {t('common:settings.language.title')}
        </Button>
        <Typography>
          {i18n.language === Language.English
            ? t('common:settings.language.en')
            : t('common:settings.language.de')}
        </Typography>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
  },
});
