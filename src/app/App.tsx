import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/components/LoginForm';
import { useAppSelector } from './hooks';
import UsersPage from '../features/users/components/UsersPage';
import TodosPage from '../features/todos/components/TodosPage';
import NavigationBar from '../components/NavigationBar';
import AuthLoading from '../components/AuthLoading';
import '@ant-design/v5-patch-for-react-19';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <NavigationBar />
      <AuthLoading>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/" element={isAuthenticated ? <TodosPage /> : <Navigate to="/login" />} />
          <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthLoading>
    </BrowserRouter>
  );
}

export default App;
