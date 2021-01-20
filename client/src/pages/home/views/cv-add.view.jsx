import React from 'react';
import { Modal } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { AddForm } from '../components';

export const CVAddView = ({ onAdd }) => {
    const match = useRouteMatch({ path: '/add' });
    const history = useHistory();

    const handleClose = () => {
        history.push('/');
    };

    const handleSubmit = (form) => {
        form.validateFields()
            .then((values) => {
                onAdd(values);
            })
            .then(() => handleClose());
    };

    return (
        <Modal
            visible={match}
            title='Create new job'
            footer={null}
            onCancel={handleClose}
        >
            <AddForm onSubmit={handleSubmit} />
        </Modal>
    );
};
