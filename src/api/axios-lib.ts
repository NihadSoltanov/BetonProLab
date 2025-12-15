import Axios, { InternalAxiosRequestConfig } from 'axios';

import { loadString, remove } from 'src/utils/appStorage';
import { getBaseUrl } from 'src/utils/stringUtils';

// 🔹 Her istekten ÖNCE çalışan interceptor
async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  // 1) BASE URL'i ayarla
  config.baseURL = await getBaseUrl();

  // 2) Login dışında token ekle
if (config.url !== "/login" && config.url !== "sendRegisterMail") {

    const token = await loadString('token');
    if (token) {
      config.headers['auth_token'] = `${token}`;
    }
  }

  // 3) Token süresi dolmuşsa user'ı sil
  const expired = await loadString('expired_time');
  if (expired) {
    const savedDate = new Date(expired);
    if (new Date() > savedDate) {
      await remove('user');
    }
  }

  config.headers!.Accept = 'application/json';

  // 🔍 LOG: Giden istekleri görmek için
  console.log('🚀 AXIOS REQUEST:', {
    baseURL: config.baseURL,
    url: config.url,
    fullUrl: (config.baseURL || '') + (config.url || ''),
    method: config.method,
    data: config.data,
    params: config.params,
  });

  return config;
}

// 🔹 Axios instance
export const axios = Axios.create();

// 🔹 Request interceptor'u bağla
axios.interceptors.request.use(authRequestInterceptor);

// 🔹 Response interceptor'u
axios.interceptors.response.use(
  async response => {
    // 🔍 LOG: Gelen cevabı görmek için
    console.log('✅ AXIOS RESPONSE:', {
      url: (response.config.baseURL || '') + (response.config.url || ''),
      status: response.status,
      data: response.data,
    });

    // Eski logout mantığın
    if (response.data.success === false && response.data.error_code === 101) {
      await remove('user');
      await remove('token');
      await remove('expired_time');
    }

    return response;
  },
  async error => {
    // 🔍 LOG: Hata durumunu görmek için
    console.log('❌ AXIOS ERROR:', {
      message: error.message,
      url: (error?.config?.baseURL || '') + (error?.config?.url || ''),
      status: error?.response?.status,
      data: error?.response?.data,
    });

    return Promise.reject(error);
  }
);
