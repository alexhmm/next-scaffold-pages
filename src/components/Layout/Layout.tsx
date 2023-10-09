import { FC, ReactNode, memo } from 'react';
import { Box } from '@mui/material';

// Components
import Nav from '@/components/Nav/Nav';

// Styles
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <Box className={styles['layout']}>
      <Nav />
      <main className={styles['layout-main']}>{props.children}</main>
    </Box>
  );
};

export default memo(Layout);
