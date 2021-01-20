import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { logoutAction, getSelf } from '../../redux/auth/actions';
import css from './styles.module.scss';

export function AppLayout({ children }) {
    const dispatch = useDispatch();
    const authorized = useSelector((state) => state.auth.authorized);
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    useEffect(() => {
        if (authorized && !user?.username) {
            dispatch(getSelf());
        }
    }, [authorized, user]);

    return (
        <Layout className={css['app-layout']}>
            {authorized && (
                <Layout.Header>
                    <Row justify='space-between' align='center'>
                        <Col>
                            <Link to='/add'>
                                <Button type='primary'>Add job</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button
                                danger
                                type='primary'
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </Layout.Header>
            )}
            <Layout.Content className={css['app-layout-content']}>
                {children}
            </Layout.Content>
        </Layout>
    );
}
