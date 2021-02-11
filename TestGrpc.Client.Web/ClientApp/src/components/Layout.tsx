import { CssBaseline } from '@material-ui/core';
import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <CssBaseline>
        <React.Fragment>
            <NavMenu />
            <Container>
                {children}
            </Container>
        </React.Fragment>
    </CssBaseline>
);

export default React.memo(Layout);