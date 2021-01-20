import { Form, Button, Input } from 'antd';

export const AddForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        onSubmit(form);
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item name='name' rules={[{ required: true, min: 4 }]}>
                <Input placeholder='Job name' />
            </Form.Item>
            <Button htmlType='submit'>Submit</Button>
        </Form>
    );
};
