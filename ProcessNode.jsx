 /* eslint-disable react/prop-types */
import { memo, useState, useEffect } from 'react';
import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Badge, Button, Modal, Form, Input } from 'antd';
import { Handle, Position } from '@xyflow/react';

const ProcessNode = ({ data, id, updateNode }) => {
  const { content, label } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      let new_value = { id: id, content: values.content, label: values.label };
      updateNode({...new_value});
      setIsModalOpen(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  useEffect(() => {
    form.setFieldsValue({ content: content, label: label });
  }, [content, label, form]);

  return (
    <>
      <Badge.Ribbon text={<SettingOutlined />} color='orange'>
        <Card
          style={{ width: 200, borderRadius: 10 }}
          size="small"
          title={label}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Button type="default" size='small' icon={<EditOutlined />} onClick={handleEdit}>Edit</Button>
          </div>
          <Handle
            type="target"
            position={Position.Left}
          />
          <Handle
            type="source"
            position={Position.Right}
          />
        </Card>
      </Badge.Ribbon>
      
      <Modal
        title="Edit"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name={"editForm"+id}
          initialValues={{ content: content, label: label }}
        >
          <Form.Item
            name="label"
            label="Label"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Edit Content"
            rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(ProcessNode);


















// ProcessNode.jsx
// import { Button } from 'antd';
// import { Handle, Position } from '@xyflow/react';
// import { memo } from 'react';

// const ProcessNode = ({ data, id, showModal }) => (
//   console.log(data),
//   <div className="process-node">
//     <div>{data.label}</div>
//     <Button type="link" onClick={() => showModal(id, data.label)}>
//       Editar
//     </Button>
//            <Handle
//              type="target"
//              position={Position.Top}
//            />
//            <Handle
//              type="source"
//              position={Position.Bottom}
//            />
//   </div>
// );

// export default memo(ProcessNode);

