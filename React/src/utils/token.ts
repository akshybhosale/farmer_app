const TOKEN_KEY = "auth_token";

// Save token
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

// Get token
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// Remove token
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// Decode token to check expiration (optional)
export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};
