/* eslint-disable react/prop-types */
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import { Form, Input, Button, Card } from 'antd';


const InputNode = ({ data }) => {
    console.log(data);
    const onFinish = (values) => {
        console.log('Form values: ', values);
    };

    return (
        <div className="process-node">
            <Card styles={{ header: { backgroundColor: '#f759ab' } }} title='Input' size="small" style={{ width: '300px', borderRadius: 10, borderColor: '#f759ab' }}>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    size="small"
                    style={{ fontSize: '12px', zIndex: 1001 }}
                >
                    {/* Input Text */}
                    <Form.Item
                        label={<span className="custom-label">Directory path</span>}
                        name="dirpath"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: <span style={{ fontSize: '10px' }}>Directory path is required</span>}]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item
                        style={{ marginBottom: '4px', marginTop: '8px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default memo(InputNode);
