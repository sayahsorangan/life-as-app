import {Box, Text} from '@app/themes';
import {Container} from '@components/container';
import {useEffect} from 'react';

export const RoleList = () => {
  useEffect(() => {
    console.log('RoleList component mounted');
  }, []);

  return (
    <Container>
      <Box flex={1} backgroundColor={'accent_1'}>
        <Text>dasds</Text>
      </Box>
    </Container>
  );
};
