import { customAxios } from 'src/configs/customAxios';

export const UserUtils = {
  getSingleUser: async () => {
    const { data } = await customAxios.get('user/single');
    return data;
  },
};
