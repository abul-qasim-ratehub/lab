'use client';

import { Button } from './primitives';
import { useAuth } from './AuthProvider';

export const LoginButton = () => {
  const { authenticated, loading, user, login, logout } = useAuth();

  if (loading) {
    return <Button disabled>Loading...</Button>;
  }

  if (authenticated && user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: 'var(--rh-font-3xs)', color: 'var(--rh-fg-secondary)' }}>
          {user.firstName} {user.lastName}
        </span>
        <Button onClick={logout} variant="ghost">
          Logout
        </Button>
      </div>
    );
  }

  return <Button onClick={login}>Login</Button>;
};
