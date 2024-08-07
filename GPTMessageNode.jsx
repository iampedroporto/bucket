/* eslint-disable react/prop-types */
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import { Form, Input, Button, Card } from 'antd';

const { TextArea } = Input;

const GPTSMessageNode = ({ data }) => {
    console.log(data);
    const onFinish = (values) => {
        console.log('Form values: ', values);
    };

    return (
        <div className="process-node">
            <Card styles={{ header: { backgroundColor: '#36cfc9' } }} title='GPT Message' size="small" style={{ width: '300px', borderRadius: 10, borderColor: '#36cfc9' }}>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    size="small"
                >
                    {/* Textarea */}
                    <Form.Item
                        label={<span className="custom-label">Role system</span>}
                        name="contentSystem"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <TextArea style={{ width: '100%' }} rows={2} autoSize={{ minRows: 6, maxRows: 6 }} styles={{textarea:{fontSize: 11}}} />
                    </Form.Item>

                    <Form.Item
                        label={<span className="custom-label">Role user</span>}
                        name="contentUser"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: <span style={{ fontSize: '10px' }}>Role user is required</span> }]}
                        extra={<span style={{ fontSize: '10px' }}>Utilize mustache template para concatenar {'{{content}}'}</span>}
                    >
                        <TextArea style={{ width: '100%' }} rows={2} autoSize={{ minRows: 6, maxRows: 6 }} />
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
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default memo(GPTSMessageNode);
