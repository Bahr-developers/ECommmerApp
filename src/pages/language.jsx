import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

import LanguageView from 'src/sections/language/view/language-view';

function Language() {
  return (
    <Container>
      <Helmet>
        <title>Language</title>
      </Helmet>
      <LanguageView />
    </Container>
  );
}

export default Language;
