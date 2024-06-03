import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

function UserHome() {
  return (
    <Container>
      <Helmet>
        <title>User</title>
      </Helmet>
      <div>UserHome</div>
    </Container>
  );
}

export default UserHome;
