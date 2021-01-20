import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppLoader, AuthRoute } from './components';
import { AppLayout } from './layouts';

import 'antd/dist/antd.css';

const routes = [
    {
        path: '/(login|signup)',
        exact: true,
        component: lazy(() => import('./pages/auth')),
        forceProtect: false,
    },
    {
        path: '/',
        exact: false,
        component: lazy(() => import('./pages/home')),
    },
];

function App() {
    return (
        <AppLayout>
            <Switch>
                {routes.map(({ component: Component, ...route }) => (
                    <AuthRoute key={route.path} {...route}>
                        <Suspense fallback={<AppLoader />}>
                            <Component />
                        </Suspense>
                    </AuthRoute>
                ))}
                <Route key='*' path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </AppLayout>
    );
}

export default App;
