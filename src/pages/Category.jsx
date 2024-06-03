import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

import CategoryView from 'src/sections/category/view/category-view';

export default function Category() {
  return (
    <Container>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <CategoryView />
    </Container>
  );
}
