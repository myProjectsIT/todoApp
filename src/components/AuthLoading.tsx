import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { me } from '../features/auth/api/authApi';
import { setUser } from '../features/auth/slices/authSlice';
import { Spin } from 'antd';

interface AuthLoadingProps {
  children: React.ReactNode;
}

const AuthLoading: React.FC<AuthLoadingProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { user, isLoggingOut } = useAppSelector((state) => state.auth); 

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const user = await me();
        dispatch(setUser(user));
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user && !isLoggingOut) {
      checkAuth();
    } else {
      setIsLoading(false);
    }

  }, [dispatch, user, isLoggingOut]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLoading;