import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addTodo } from '../slices/todosSlice';

const CreateTodoModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  console.log('User in CreateTodoModal:', user)

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (user && user.name) {
        console.log('Dispatching addTodo with createdBy:', user.name);
        dispatch(addTodo({ ...values, createdBy: user.name }));
        form.resetFields();
        setVisible(false);
      } else {
        console.error('User information not available');
      }
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button className="create-todo" type="primary" onClick={() => setVisible(true)}>
        Create Todo
      </Button>
      <Modal
        title="Create a new todo"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title of todo!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description of todo!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTodoModal;
