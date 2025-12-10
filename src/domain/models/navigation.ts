import { type ROUTES } from 'src/navigation/routes';

export type RootStackParamList = {
  [ROUTES.Home]: any;
  [ROUTES.Login]: any;
  [ROUTES.Register]: any;      // ✅ EKLENDİ
  [ROUTES.OrderHistory]: any;
  [ROUTES.OngoingOrder]: any;
};
