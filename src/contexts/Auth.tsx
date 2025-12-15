import { FC, createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { login } from "src/data/querys/authQuery";
import { AuthContextData, AuthData } from "src/domain/models/AuthContextData";
import { LoginDto } from "src/domain/models/LoginDto";
import { loadString, remove, saveString, clear } from "src/utils/appStorage";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC<any> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const user = await loadString("user");
      const user_id = await loadString("user_id");
      const token = await loadString("token");
      const expired = await loadString("expired_time");

      if (user && token && expired) {
        const _authData: AuthData = {
          auth_token: token,
          expired: expired,
          user: user,
          user_id: user_id || "",
        };
        setAuthData(_authData);
      } else {
        setAuthData(undefined);
      }
    } catch (error) {
      console.log("loadStorageData error:", error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (data: LoginDto) => {
    await remove("token");
    await clear();

    const result = await login(data);
    console.log("LOGIN RESULT:", result);

    if (!result) {
      Alert.alert("Invalid username or password");
      return;
    }

    setAuthData(result);

    await saveString("user", result.user);
    await saveString("token", result.auth_token);
    await saveString("expired_time", result.expired);

    if (result.user_id) {
      await saveString("user_id", result.user_id);
    }
  };

  const signOut = async () => {
    setAuthData(undefined);
    await remove("user");
    await remove("token");
    await remove("expired_time");
    await remove("user_id");
    await clear();
  };

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
