import * as React from 'react';

const genericMemo: <T>(Component: T, propsAreEqual?: Parameters<typeof React.memo>[1]) => T = React.memo;

export default genericMemo;