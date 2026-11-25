import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { AuthContext } from './contextValue';

const TOKEN_STORAGE_KEY = 'hph.auth.token';
const USERNAME_STORAGE_KEY = 'hph.auth.username';
const ROLE_STORAGE_KEY = 'hph.auth.role';

function getTokenExpiration(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    const base64Payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = base64Payload.padEnd(Math.ceil(base64Payload.length / 4) * 4, '=');
    const decodedPayload = window.atob(paddedPayload);
    const bytes = Uint8Array.from(decodedPayload, (character) => character.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));

    return typeof payload?.exp === 'number' && Number.isFinite(payload.exp)
      ? payload.exp * 1000
      : null;
  } catch {
    return null;
  }
}

function clearStoredAuth() {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(USERNAME_STORAGE_KEY);
  window.localStorage.removeItem(ROLE_STORAGE_KEY);
}

function readStoredAuth() {
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  const expiresAt = token ? getTokenExpiration(token) : null;

  if (!token || !expiresAt || expiresAt <= Date.now()) {
    clearStoredAuth();
    return { token: null, user: null };
  }

  const username = window.localStorage.getItem(USERNAME_STORAGE_KEY);
  const role = window.localStorage.getItem(ROLE_STORAGE_KEY);

  return {
    token,
    user: username || role ? { username, role } : null
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);
  const { token, user } = auth;

  const login = useCallback(async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    const receivedToken = response.data?.token ?? response.data?.data?.token;
    const responseUser = response.data?.user ?? response.data?.data?.user;
    const receivedRole = responseUser?.role ?? response.data?.role ?? response.data?.data?.role;
    const receivedUsername =
      responseUser?.username ?? response.data?.username ?? response.data?.data?.username ?? username;
    const expiresAt = typeof receivedToken === 'string' ? getTokenExpiration(receivedToken) : null;

    if (!expiresAt || expiresAt <= Date.now()) {
      throw new Error('The login response did not include a valid, unexpired authentication token.');
    }

    const authenticatedUser = {
      username: receivedUsername,
      role: typeof receivedRole === 'string' ? receivedRole : null
    };

    window.localStorage.setItem(TOKEN_STORAGE_KEY, receivedToken);
    window.localStorage.setItem(USERNAME_STORAGE_KEY, authenticatedUser.username);
    if (authenticatedUser.role) {
      window.localStorage.setItem(ROLE_STORAGE_KEY, authenticatedUser.role);
    } else {
      window.localStorage.removeItem(ROLE_STORAGE_KEY);
    }

    setAuth({ token: receivedToken, user: authenticatedUser });
    return authenticatedUser;
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setAuth({ token: null, user: null });
  }, []);

  const logoutIfCurrentToken = useCallback((expectedToken) => {
    if (window.localStorage.getItem(TOKEN_STORAGE_KEY) !== expectedToken) {
      return;
    }

    logout();
  }, [logout]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const expiresAt = getTokenExpiration(token);
    if (!expiresAt || expiresAt <= Date.now()) {
      logoutIfCurrentToken(token);
      return undefined;
    }

    const timeoutId = window.setTimeout(
      () => logoutIfCurrentToken(token),
      expiresAt - Date.now()
    );
    return () => window.clearTimeout(timeoutId);
  }, [token, logoutIfCurrentToken]);

  useEffect(() => {
    const handleAuthExpired = (event) => {
      if (event.detail === token) {
        logoutIfCurrentToken(token);
      }
    };

    window.addEventListener('hph:auth-expired', handleAuthExpired);
    return () => window.removeEventListener('hph:auth-expired', handleAuthExpired);
  }, [token, logoutIfCurrentToken]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && getTokenExpiration(token) > Date.now()),
      login,
      logout
    }),
    [token, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
