import { useCallback } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';
import { Button, Typography } from '@mui/material';

// Styles
import styles from './Home.module.scss';

// Types
import { Language } from '@/types/shared.types';

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { i18n, t } = useTranslation();

  /**
   * Handler on language change.
   * @param lng Language
   */
  const onChangeLanguage = useCallback(
    (lng: Language) => {
      router.push(`${router.asPath}`, `${router.asPath}`, { locale: lng });
    },
    [router.pathname]
  );

  return (
    <main className={styles['home']}>
      <Typography variant="h5">{t('home:title')}</Typography>
      <Button
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      >
        Theme
      </Button>
      <Button
        onClick={() =>
          onChangeLanguage(
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
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
  },
});
