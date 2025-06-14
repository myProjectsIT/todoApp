import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { getUsers } from '../../auth/api/authApi';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UserMeResponse } from '../../auth/types/authTypes'; 

const UsersPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<UserMeResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: ColumnsType<UserMeResponse> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="not-auth-cont">
        <div className="not-auth">You are not authorized to view this page.</div>;
      </div>
    )
  }

  return (
    <div className="users-table" style={{ backgroundColor: '#f1f1f1', borderRadius: '10px', padding: '20px' }}>
      <Table<UserMeResponse>
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey={(record) => `${record.name}-${record.role}`} 
      />
    </div>
  );
};

export default UsersPage;
