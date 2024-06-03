/* eslint-disable perfectionist/sort-imports */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

export default function App() {
  const navigate = useNavigate('');
  const userAccess = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!userAccess) {
      navigate('/login');
    }
  });

  useScrollToTop();

  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'uz');
  }

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
