import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

import { UserView } from 'src/sections/user/view';

export default function UserPage() {
  return (
    <Container>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <UserView />
    </Container>
  );
}
