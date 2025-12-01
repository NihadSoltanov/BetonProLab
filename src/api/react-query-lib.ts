import { type AxiosError } from 'axios';
import {
  QueryClient, type UseQueryOptions, type UseMutationOptions, type DefaultOptions,
} from 'react-query';

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient();

