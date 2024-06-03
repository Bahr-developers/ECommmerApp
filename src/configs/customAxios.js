// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

// eslint-disable-next-line import/no-cycle
import { AuthUtils } from 'src/utils/auth.utils';

import { BaseUrl } from 'src/constants/BaseUrl';

export const customAxios = axios.create({
  baseURL: BaseUrl,
  timeout: 1000,
});

customAxios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

customAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 406) {
      AuthUtils.refreshAuth();
      window.location.reload();
    }
  }
);
