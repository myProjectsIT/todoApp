import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../../../src/types/Todo';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todosApi';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  'todos/fetchTodos',
  async (_, thunkAPI) => {
    try {
      const todos = await getTodos();
      return todos;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk<Todo, { title: string; description: string; createdBy: string }, { rejectValue: string }>(
  'todos/addTodo',
  async (todoData, thunkAPI) => {
    console.log('addTodo thunk called with data:', todoData);
    try {
      const response = await createTodo(todoData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTodo = createAsyncThunk<Todo, { id: number; title: string; description: string }, { rejectValue: string }>(
  'todos/editTodo',
  async ({ id, title, description }, thunkAPI) => {
    try {
      await updateTodo(id, { title, description });
      const todos = await getTodos();
      return todos.find(x => x.id === id) as Todo;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeTodo = createAsyncThunk<number, number, { rejectValue: string }>(
  'todos/removeTodo',
  async (id, thunkAPI) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch todos';
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add todo';
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
          state.todos = state.todos.map(todo =>
            todo.id === action.payload.id ? action.payload : todo
          );
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to edit todo';
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove todo';
      });
  },
});

export const { } = todosSlice.actions;

export default todosSlice.reducer;
