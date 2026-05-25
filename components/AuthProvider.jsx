'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// Use relative URLs to hit local API routes, or external BFF if NEXT_PUBLIC_BFF_URL is set
const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL || '';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    try {
      const response = await fetch(`${BFF_URL}/auth/me`, {
        credentials: 'include',
      });

      if (!response.ok) {
        setUser(null);
        setAuthenticated(false);
        return;
      }

      const data = await response.json();

      if (data.authenticated && data.user) {
        setUser(data.user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Session validation error:', error);
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const response = await fetch(`${BFF_URL}/auth/login`, {
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Login request failed:', response.status);
        return;
      }

      const data = await response.json();

      if (data.loginUrl) {
        window.location.href = data.loginUrl;
      } else if (data.success) {
        await validateSession();
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BFF_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getPreFill = async (product) => {
    try {
      const response = await fetch(`${BFF_URL}/profile/pre-fill?product=${product}`, {
        credentials: 'include',
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Pre-fill fetch error:', error);
      return null;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const response = await fetch(`${BFF_URL}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser({
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.first_name,
          lastName: updatedUser.last_name,
        });
        return updatedUser;
      }
      return null;
    } catch (error) {
      console.error('Profile update error:', error);
      return null;
    }
  };

  const logApplication = async (productType, status, lender) => {
    try {
      const response = await fetch(`${BFF_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productType, status, lender }),
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Application logging error:', error);
      return null;
    }
  };

  const value = {
    user,
    authenticated,
    loading,
    login,
    logout,
    getPreFill,
    updateProfile,
    logApplication,
    validateSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const usePreFill = (product) => {
  const { getPreFill } = useAuth();
  const [preFill, setPreFill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreFill = async () => {
      const data = await getPreFill(product);
      setPreFill(data);
      setLoading(false);
    };
    fetchPreFill();
  }, [product, getPreFill]);

  return { preFill, loading };
};
