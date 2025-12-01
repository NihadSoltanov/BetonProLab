import { FC, createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { login } from "src/data/querys/authQuery";
import { AuthContextData, AuthData } from "src/domain/models/AuthContextData";
import { LoginDto } from "src/domain/models/LoginDto";
import { loadString, remove, saveString, clear } from "src/utils/appStorage";




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
          const user= await loadString("user");
          if(user){
            setUserdata(user);
            const _authData: AuthData = {auth_token:"",expired:"",user:user};
            setAuthData(_authData);
          }
          else{
            const _authData: AuthData = {auth_token:"",expired:"",user:""};
            setAuthData(undefined);
          }
        } catch (error) {
        } finally {
          //loading finished
          setLoading(false);
        }
      }
    
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
        <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
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