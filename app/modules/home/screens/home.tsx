import {Box} from '@app/themes';
import {useEffect} from 'react';

export const Home = () => {
  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  return (
    <Box backgroundColor={'accent_1'} flex={1}>
      <Box>Role List</Box>
    </Box>
  );
};
