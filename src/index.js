import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';

import stores from './stores/';
import Page from './components/Page';

render(
    <Provider {...stores}>
        <Page/>
    </Provider>,
    document.getElementById('root')
);
