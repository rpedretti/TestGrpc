import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import UserPage from './components/UserPage/UserPage';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={UserPage} />
    </Layout>
);
