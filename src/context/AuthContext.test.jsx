// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';

const TOKEN_STORAGE_KEY = 'hph.auth.token';
const USERNAME_STORAGE_KEY = 'hph.auth.username';
const ROLE_STORAGE_KEY = 'hph.auth.role';

function createToken() {
  const expiration = Math.ceil(Date.now() / 1000) + 3600;
  const payload = window.btoa(JSON.stringify({ exp: expiration }));
  return `header.${payload}.signature`;
}

function AuthProbe() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <output data-testid="auth-state">
        {isAuthenticated ? `signed-in:${user?.username}` : 'signed-out'}
      </output>
      <button type="button" onClick={logout}>Sign out</button>
    </>
  );
}

describe('AuthProvider logout', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem(TOKEN_STORAGE_KEY, createToken());
    window.localStorage.setItem(USERNAME_STORAGE_KEY, 'patient');
    window.localStorage.setItem(ROLE_STORAGE_KEY, 'patient');
  });

  afterEach(() => {
    cleanup();
  });

  it('clears stored credentials when logout is used directly as a click handler', () => {
    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-state').textContent).toBe('signed-in:patient');

    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));

    expect(screen.getByTestId('auth-state').textContent).toBe('signed-out');
    expect(window.localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem(USERNAME_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem(ROLE_STORAGE_KEY)).toBeNull();
  });
});
