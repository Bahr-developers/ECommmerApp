import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

function userSetting() {
  return (
    <Container>
      <Helmet>
        <title>User setting</title>
      </Helmet>
      <div>userSetting</div>
    </Container>
  );
}

export default userSetting;
