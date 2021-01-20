import React from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';

import { JobItem } from '../components';

export const CVListView = ({ onDelete, onUpdate }) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <List
            style={{ width: 500 }}
            dataSource={user.jobs}
            renderItem={(job) => (
                <JobItem
                    key={job._id}
                    job={job}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            )}
        />
    );
};
