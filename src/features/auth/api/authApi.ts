import { LoginRequest, UserMeResponse } from '../types/authTypes';
import { API_BASE_URL } from '../../../app/config';

const convertToRecord = (obj: any): Record<string, string> => {
  const record: Record<string, string> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      record[key] = String(obj[key]); 
    }
  }
  return record;
};

export const login = async (credentials: LoginRequest): Promise<UserMeResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body: new URLSearchParams(convertToRecord(credentials)).toString(), 
      credentials: 'include'
    });
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.message);
    }
    const data: UserMeResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error('Login Error:', error.message);
    throw error;
  }
};

export const me = async (): Promise<UserMeResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      credentials: 'include', 
    });
    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: UserMeResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error('Me Error:', error.message);
    return null; 
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Logout Error:', error.message);
    throw error;
  }
};

export const getUsers = async (): Promise<UserMeResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      credentials: 'include', 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: UserMeResponse[] = await response.json();
    return data;
  } catch (error: any) {
    console.error('Get Users Error:', error.message);
    throw error;
  }
};
