import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import DocumentTitle from 'react-document-title'

import stores from './stores/';
import Page from './components/Page';
import {fullTitle} from './metadata'

render(
    <Provider {...stores}>
        <DocumentTitle title={fullTitle}>
        <Page/>
        </DocumentTitle>
    </Provider>,
    document.getElementById('root')
);
