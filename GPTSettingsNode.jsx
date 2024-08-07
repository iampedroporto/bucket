/* eslint-disable react/prop-types */
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import { Form, Input, Select, Radio, Checkbox, Button, Card, InputNumber } from 'antd';

const { Option } = Select;

const GPTSettingsNode = ({ data }) => {
    console.log(data);
    const onFinish = (values) => {
        console.log('Form values: ', values);
    };

    return (
        <div className="process-node">
            <Card styles={{ header: { backgroundColor: '#fa8c16' } }} title='GPT Settings' size="small" style={{ width: '300px', borderRadius: 10, borderColor: '#fa8c16' }}>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    size="small"
                    style={{ fontSize: '12px', zIndex: 1001 }}
                >

                    {/* Radio with 2 options */}
                    <Form.Item
                        label={<span className="custom-label">Provider</span>}
                        name="provider"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: <span style={{ fontSize: '10px' }}>Provider is required</span>}]}
                    >
                        <Radio.Group style={{ width: '100%' }}>
                            <Radio value="azure" className="custom-label">Azure</Radio>
                            <Radio value="Openai" className="custom-label">Openai</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/* Select with 3 options */}
                    <Form.Item
                        label={<span className="custom-label">Model</span>}
                        name="model"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: <span style={{ fontSize: '10px' }}>Model is required</span>}]}
                    >
                        <Select style={{ width: '100%' }}>
                            <Option value="chatgpt4o">ChatGPT 4o</Option>
                            <Option value="chatgot4turbo">ChatGPT 4 Turbo</Option>
                            <Option value="chatgpt35">ChatGPT 3.5</Option>
                        </Select>
                    </Form.Item>

                    {/* input with limitation (0 to 2, step 0.1) */}
                    <Form.Item
                        label={<span className="custom-label">Temperature</span>}
                        name="temperature"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: <span style={{ fontSize: '10px' }}>Temperature is required</span>}]}
                    >
                        <InputNumber
                            min={0}
                            max={2}
                            step={0.1}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    {/* input without limitation */}
                    <Form.Item
                        label={<span className="custom-label">Seed (Beta)</span>}
                        name="seed"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    {/* Checkbox true or false */}
                    <Form.Item
                        name="json"
                        valuePropName="json"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Checkbox className="custom-label">Json output</Checkbox>
                    </Form.Item>

                    {/* Input Text */}
                    <Form.Item
                        label={<span className="custom-label">Stop sequence</span>}
                        name="stopSequence"
                        className='custom-form-item'
                        style={{ marginBottom: '4px' }}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
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
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default memo(GPTSettingsNode);
