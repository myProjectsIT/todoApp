import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { login } from '../api/authApi';
import { LoginRequest } from '../types/authTypes';
import { Button, Input, Alert } from 'antd';
import { useAppSelector } from '../../../app/hooks';

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const dispatch = useDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: LoginRequest) => {
    dispatch(loginStart());
    try {
      const user = await login(data);
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login">
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 className="login-header">Login</h2>
      {error && <Alert message={error} type="error" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '10px' }}>
          <Controller 
            name="login"
            control={control}
            defaultValue=""
            rules={{ required: 'Login is required' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Login"
              />
            )}
          />
          {errors.login && <div style={{ color: 'red' }}>{errors.login.message}</div>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Controller 
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Password"
              />
            )}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
        </div>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;