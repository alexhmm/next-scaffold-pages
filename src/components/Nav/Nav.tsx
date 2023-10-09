import { FC, memo } from 'react';
import Link from 'next/link';

// Styles
import styles from './nav.module.scss';

const Nav: FC = () => {
  return (
    <div className={styles['nav']}>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
    </div>
  );
};

export default memo(Nav);
