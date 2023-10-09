import { FC, memo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

// Styles
import styles from './nav.module.scss';

const Nav: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles['nav']}>
      <Link href="/">{t('common:nav.home')}</Link>
      <Link href="/posts">{t('common:nav.posts')}</Link>
    </div>
  );
};

export default memo(Nav);
