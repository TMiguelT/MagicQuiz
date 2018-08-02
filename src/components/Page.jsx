import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Quiz from './Quiz';
import Form from './Form';


@observer
export default class Page extends React.Component {

    render() {
        return (
            <div>
                <Form/>
                <Quiz cards={this.props.store.cards}/>
            </div>
        );
    }
}
