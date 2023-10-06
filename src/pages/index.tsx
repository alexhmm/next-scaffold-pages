import { useTheme } from 'next-themes';
import { Button, Typography } from '@mui/material';

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Button
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      >
        Theme
      </Button>
      <Typography>Test</Typography>
    </main>
  );
}
