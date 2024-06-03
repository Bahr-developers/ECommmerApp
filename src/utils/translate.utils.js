import { customAxios } from 'src/configs/customAxios';

export const TranslateUtils = {
  getTranslate: async () => {
    const { data } = await customAxios.get('translate/find/all', {
      headers: {
        'accept-language': localStorage.getItem('language') || 'uz',
      },
    });
    return data;
  },
  addTranslate: async ({ code, definition, type }) => {
    const { data } = await customAxios.post('translate/add', {
      code,
      definition,
      type,
    });
    return data;
  },
  editTranslate: async ({ id, definition }) => {
    const { data } = await customAxios.patch(`translate/edit/${id}`, { definition });
    return data;
  },
  deleteTranslate: async (id) => {
    const { data } = await customAxios.delete(`translate/delete/${id}`);
    return data;
  },
};
