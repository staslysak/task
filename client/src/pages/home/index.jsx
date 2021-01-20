import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { createJob, updateJob, deleteJob } from '../../redux/auth/actions';
import { CVAddView, CVListView } from './views';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();

    const handleAddJob = (job) => {
        dispatch(createJob(job));
    };

    const handleDeleteJob = (jobId) => {
        dispatch(deleteJob(jobId));
    };

    const handleUpdateJob = (jobId) => {
        dispatch(updateJob(jobId));
    };

    return (
        <Switch>
            <Route path='/add'>
                <CVAddView onAdd={handleAddJob} />
            </Route>
            <Route>
                <CVListView
                    onDelete={handleDeleteJob}
                    onUpdate={handleUpdateJob}
                />
            </Route>
        </Switch>
    );
};

export default Home;
