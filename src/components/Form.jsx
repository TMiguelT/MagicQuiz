import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import NewQuiz from '../forms/NewQuiz';

const form = new NewQuiz();

@observer
export default class Question extends React.Component {

    render() {
        return (
            <form>
                <label htmlFor={form.$('query').id}>
                    {form.$('query').label}
                </label>
                <input {...form.$('query').bind()} />
                <p>{form.$('query').error}</p>
                
                <label htmlFor={form.$('prompt').id}>
                    {form.$('prompt').label}
                </label>
                <input {...form.$('prompt').bind()} />
                <p>{form.$('prompt').error}</p>
            </form>
        );
    }
}
