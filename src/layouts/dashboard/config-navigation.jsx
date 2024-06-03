// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies, import/no-duplicates
import { MdLanguage } from 'react-icons/md';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BiCategory } from 'react-icons/bi';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
import { MdGTranslate } from 'react-icons/md';

import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Translate',
    path: '/translate',
    icon: <MdGTranslate size={22} />,
  },
  {
    title: 'language',
    path: '/language',
    icon: <MdLanguage size={22} />,
  },
  {
    title: 'products',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'category',
    path: '/category',
    icon: <BiCategory size={22} />,
  },
  {
    title: 'users',
    path: '/users',
    icon: icon('ic_user'),
  },

  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
