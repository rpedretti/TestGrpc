import * as React from 'react';
import { Route } from 'react-router';
import Layout from 'components/Layout';
import UserPage from 'components/UserPage';

import './custom.css'

const App = () => (
    <Layout>
        <Route exact path='/' component={UserPage} />
    </Layout>
);

export default App;
