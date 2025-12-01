import Axios, { InternalAxiosRequestConfig } from 'axios';

import { loadString, remove, saveString } from 'src/utils/appStorage';
import { getBaseUrl } from 'src/utils/stringUtils';


async function authRequestInterceptor(config: InternalAxiosRequestConfig) {

  config.baseURL= await getBaseUrl();   
  if(config.url!=="/login"){
  const token = await loadString("token");
  if (token) {
    config.headers['auth_token'] = `${token}`;
  }
 }
 //await remove("user");
  const expired=await loadString('expired_time');
  if(expired){
   const savedDate = new Date(expired);
     if(new Date()>savedDate){
      await remove("user");
     }
  }
  config.headers!.Accept = 'application/json';
  return config;
}




export const axios = Axios.create();


axios.interceptors.request.use(authRequestInterceptor);



axios.interceptors.response.use(
  async response => {
    if (response.data.success===false && response.data.error_code===101)
      {
        await remove("user");
        await remove("token");
        await remove("expired_time");
      }
      return response;
  },
);

