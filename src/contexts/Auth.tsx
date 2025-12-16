import { FC, createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { login } from "src/data/querys/authQuery";
import { AuthContextData, AuthData } from "src/domain/models/AuthContextData";
import { LoginDto } from "src/domain/models/LoginDto";
import { loadString, remove, saveString, clear } from "src/utils/appStorage";
import { deactivateAccount } from 'src/data/querys/authQuery';




  const AuthContext = createContext<AuthContextData>({} as AuthContextData);

  const AuthProvider:FC<any> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>();
    const [loading, setLoading] = useState(true);
    const [userdata, setUserdata] = useState("");
    useEffect(() => {
        loadStorageData();
      }, [userdata]);
    
    async function loadStorageData(): Promise<void> {
      try {
        const user = await loadString("user");
        const user_id = await loadString("user_id");
        const token = await loadString("token");
        const expired = await loadString("expired_time");

        if (user && user_id && token) {
          const _authData: AuthData = {
            auth_token: token,
            expired: expired ?? "",
            user: user,
            user_id: Number(user_id),
          };

          setAuthData(_authData);
        } else {
          setAuthData(undefined);
        }
      } catch (error) {
        setAuthData(undefined);
      } finally {
        setLoading(false);
      }
    }

    const deleteAccount = async () => {
      if (!authData?.user_id) {
        Alert.alert('User not found');
        return;
      }

      try {
        await deactivateAccount(authData.user_id);
        await signOut(); // 🔥 backend success → logout
      } catch (e) {
        Alert.alert('Delete account failed');
      }
    };

      const signIn = async (data:LoginDto) => {
        await remove("token");
        await clear();

        const result = await login(data);
        console.log(result);
        setAuthData(result);

        if (result) {
            await saveString('user', data.username);
            await saveString('token', result.auth_token);
            await saveString('expired_time', result.expired);
        }
        else{
            Alert.alert("Invalid username or password");
        }
      };
    
      const signOut = async () => {
        setAuthData(undefined);
        await remove('user');
        await remove('token');
        await remove('expired_time');
        await clear();
      };
    
      return (
        <AuthContext.Provider value={{authData, loading, signIn, signOut,deleteAccount,}}>
          {children}
        </AuthContext.Provider>
      );
    };
    
    function useAuth(): AuthContextData {
      const context = useContext(AuthContext);
    
      if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
    
      return context;
    }
    
    export {AuthContext, AuthProvider, useAuth};