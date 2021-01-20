import { useState } from 'react';
import { List, Button, Row, Col, Space, Form, Input } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    CloseOutlined,
    CheckOutlined,
} from '@ant-design/icons';

export const JobItem = ({ job, onDelete, onUpdate }) => {
    const [form] = Form.useForm();
    const [edit, setEdit] = useState(false);

    const toggleEdit = () => setEdit((prev) => !prev);

    const handleDelete = () => {
        onDelete(job._id);
    };

    const handleUpdate = (values) => {
        onUpdate({ _id: job._id, ...values });
        toggleEdit();
    };

    return (
        <List.Item>
            <Row justify='space-between' style={{ width: '100%' }}>
                {edit ? (
                    <Col span={24}>
                        <Form
                            form={form}
                            initialValues={{ name: job.name }}
                            onFinish={handleUpdate}
                        >
                            <Row
                                justify='space-between'
                                style={{ width: '100%' }}
                            >
                                <Col>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name='name'
                                        rules={[{ required: true, min: 4 }]}
                                    >
                                        <Input placeholder='Job name' />
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Space>
                                        <Button
                                            htmlType='submit'
                                            type='primary'
                                            icon={<CheckOutlined />}
                                        />
                                        <Button
                                            danger
                                            type='primary'
                                            icon={<CloseOutlined />}
                                            onClick={toggleEdit}
                                        />
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                ) : (
                    <>
                        <Col>{job.name}</Col>
                        <Col>
                            <Space>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                    onClick={toggleEdit}
                                />
                                <Button
                                    danger
                                    type='primary'
                                    icon={<DeleteOutlined />}
                                    onClick={handleDelete}
                                />
                            </Space>
                        </Col>
                    </>
                )}
            </Row>
        </List.Item>
    );
};
