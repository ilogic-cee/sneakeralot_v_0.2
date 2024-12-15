import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useAuthContext();

  const getAuthHeader = () => {
    if (auth.user?.token) {
      return {
        Authorization: `Bearer ${auth.user.token}`,
      };
    }
    return {};
  };

  return {
    ...auth,
    getAuthHeader,
    isLoggedIn: !!auth.user,
  };
}; 