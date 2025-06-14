import { API_BASE_URL } from '../../../app/config';
import { Todo } from '../../../types/Todo'; 

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const message = `HTTP error! Status: ${response.status}`;
    console.error(message);
    throw new Error(message);
  }
  try {
    return await response.json();
  } catch (error: any) {
    console.error('JSON Parse Error:', error.message);
    throw error;
  }
};


export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/todos`, { credentials: 'include' });
  return handleResponse(response);
};

export const createTodo = async (todoData: { title: string; description: string; createdBy: string }): Promise<Todo> => {
  console.log('Creating todo with data:', todoData);
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
    credentials: 'include',
  });
  return handleResponse(response);
};

export const getTodo = async (id: number): Promise<Todo> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      credentials: 'include',
    });
    return handleResponse(response);
  } catch (error: any) {
    console.error('Get Todo Error:', error.message);
    throw error;
  }
};

export const updateTodo = async (id: number, todoData: { title: string; description: string }): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
