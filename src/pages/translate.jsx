import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

import { TranslateView } from 'src/sections/translate/view';

function translate() {
  return (
    <Container>
      <Helmet>
        <title>Translate</title>
      </Helmet>
      <TranslateView />
    </Container>
  );
}

export default translate;
