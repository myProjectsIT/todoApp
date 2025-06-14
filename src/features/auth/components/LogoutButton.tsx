import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutStart, logoutSuccess } from '../slices/authSlice';
import { logout } from '../api/authApi';
import { Button } from 'antd';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      await logout();
      dispatch(logoutSuccess());
    } catch (error: any) {
      console.error('Logout failed:', error.message);
      // TODO:  Обработать ошибку (например, показать сообщение пользователю)
    }
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;