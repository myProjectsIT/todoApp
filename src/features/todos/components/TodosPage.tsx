import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTodos, removeTodo } from '../slices/todosSlice';
import LogoutButton from '../../auth/components/LogoutButton';
import { Button, Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Todo } from '../../../types/Todo';
import CreateTodoModal from './CreateTodoModal';
import EditTodoModal from './EditTodoModal';
import { Modal } from 'antd';

const TodosPage: React.FC = () => {
  const { todos, loading, error } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth); 
  console.log('User:', user); 
  const isAdmin = user?.role === 'admin'; 

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this todo?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        dispatch(removeTodo(id));
      },
      onCancel: () => {
      }
    });
};

  const columns: ColumnsType<Todo> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record: Todo) => {
        console.log('Record:', record); 
        const canEditAndDelete = isAdmin || (user && record.createdBy === "user");

        return (
          <Space size="middle">
            {canEditAndDelete ? (
              <>
                <EditTodoModal todo={record} />
                <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </>
            ) : null}
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ backgroundColor: '#f1f1f1', borderRadius: '10px', padding: '20px' }}>
      <CreateTodoModal />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table
        columns={columns}
        dataSource={todos}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default TodosPage;
