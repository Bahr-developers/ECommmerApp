import { customAxios } from 'src/configs/customAxios';

export const LanguageUtils = {
  getLanguage: async () => {
    const { data } = await customAxios.get('language', {
      headers: {
        'accept-language': localStorage.getItem('language') || 'uz',
      },
    });
    return data;
  },
  addLanguage: async ({ code, title, image }) => {
    const formData = new FormData();
    formData.append('code', code);
    formData.append('title', title);
    formData.append('image', image);
    const { data } = await customAxios.post('language/add', formData);
    return data;
  },
  editLanguage: async ({ id, title, image }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    const { data } = await customAxios.patch(`language/edit/${id}`, formData);
    return data;
  },
  deleteLanguage: async (id) => {
    const { data } = await customAxios.delete(`language/delete/${id}`);
    return data;
  },
};
