import { err } from "react-native-svg/lib/typescript/xml";
import { axios } from "src/api/axios-lib";
import { LoginDto } from "src/domain/models/LoginDto";
import { remove } from "src/utils/appStorage";
import { saveString } from "src/utils/appStorage";


const deactivateAccount = async (userId: number) => {
  const response = await axios.get('deactivateUser', {
    params: { user_id: userId },
  });

  if (!response.data.success) {
    throw new Error('Deactivate failed');
  }

  return true;
};

const login = async (data: LoginDto) => {
  await saveString('base_url', data.base_url || '');

  const response = await axios.get('login', {
    params: {
      user: data.username,
      psw: data.password,
    },
  });


  const {
    success,
    user_id,
    username,
    access_token,
    expire_time,
  } = response.data;

  if (!success) {
    return undefined;
  }

  return {
    auth_token: access_token,
    expired: expire_time,
    user: username,
    user_id: Number(user_id),
  };
};


  export {login, deactivateAccount };