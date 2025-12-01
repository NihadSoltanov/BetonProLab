import { err } from "react-native-svg/lib/typescript/xml";
import { axios } from "src/api/axios-lib";
import { LoginDto } from "src/domain/models/LoginDto";
import { remove } from "src/utils/appStorage";
import { saveString } from "src/utils/appStorage";


const login = async (data: LoginDto) =>{
 await saveString('base_url', data.base_url || '');
 const response= await axios.get('login',{params:{user:data.username,
  psw:data.password}});
  const { success} = response.data;

  if(success === false)
  {
    return undefined;
  }

    const cookies=response.headers['set-cookie']!;
      const data1=cookies[0].split(';')[0];
      const auth_token=data1.substring(11,data1.length);
      const data2=cookies[0].split(';')[1];
      const expired=data2.substring(9,data2.length);
   return {auth_token:auth_token,expired:expired,user:data.username};
};

  export {login};