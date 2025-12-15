import { LoginDto } from "./LoginDto";

export type AuthData = {
  auth_token: string;
  expired: string;
  user: string;
  user_id?: string; // OPTIONAL OLARAQ ƏLAVƏ EDİLDİ
};

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(data: LoginDto): Promise<void>;
  signOut(): void;
};
