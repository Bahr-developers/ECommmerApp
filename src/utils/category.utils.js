import { customAxios } from 'src/configs/customAxios';

export const CategoryUtils = {
  getCategory: async () => {
    const { data } = await customAxios.get('category/find/all', {
      headers: {
        'Accept-language': localStorage.getItem('language'),
      },
    });
    return data;
  },
};
