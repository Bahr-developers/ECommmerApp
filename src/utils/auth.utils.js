// eslint-disable-next-line import/no-cycle
import { customAxios } from 'src/configs/customAxios';

export const AuthUtils = {
  loginAuthAdmin: async ({ phone, password }) => {
    const { data } = await customAxios.post('auth/login/admin', {
      phone,
      userAgent: window.navigator.userAgent,
      password,
    });
    return data;
  },
  refreshAuth: async () => {
    const { data } = await customAxios.post(
      'auth/refresh',
      {
        userAgent: window.navigator.userAgent,
      },
      {
        headers: {
          refreshToken: localStorage.getItem('refreshToken'),
        },
      }
    );

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    // add new access token
    customAxios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    return data;
  },
};
