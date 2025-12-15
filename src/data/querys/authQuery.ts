import { axios } from "src/api/axios-lib";
import { LoginDto } from "src/domain/models/LoginDto";
import { saveString } from "src/utils/appStorage";

const login = async (data: LoginDto) => {
  await saveString("base_url", data.base_url || "");

  const response = await axios.get("login", {
    params: {
      user: data.username,
      psw: data.password,
    },
  });

  const { success, user_id } = response.data;

  if (success === false) {
    return undefined;
  }

  // COOKIE PARSING — ƏVVƏLKİ KİMİ
  const cookies = response.headers["set-cookie"]!;
  const data1 = cookies[0].split(";")[0];
  const auth_token = data1.substring(11);

  const data2 = cookies[0].split(";")[1];
  const expired = data2.substring(9);

  // user_id gəlirsə əlavə edirik
  return {
    auth_token: auth_token,
    expired: expired,
    user: data.username,
    user_id: user_id ? user_id.toString() : "",
  };
};

export { login };
