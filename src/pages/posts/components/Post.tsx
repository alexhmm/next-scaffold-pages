import { FC } from 'react';

// Styles
import styles from './Post.module.scss';

// Types
import { Planet } from '../types/posts.types';
import { Typography } from '@mui/material';

type PostProps = {
  planet: Planet;
};

const Post: FC<PostProps> = (props) => {
  return (
    <div className={styles['post']}>
      <Typography variant="h6">{props.planet.name}</Typography>
      <div>{props.planet.climate}</div>
    </div>
  );
};

export default Post;
