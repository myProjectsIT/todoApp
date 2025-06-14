import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { editTodo } from '../slices/todosSlice';
import { Todo } from '../../../types/Todo';

interface EditTodoModalProps {
  todo: Todo;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        title: todo.title,
        description: todo.description,
      });
    }
  }, [form, todo, visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(editTodo({ id: todo.id, title: values.title, description: values.description }));
      setVisible(false);
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Edit
      </Button>
      <Modal
        title="Edit todo"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form id="todoForm" form={form} layout="vertical">
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

export default EditTodoModal;