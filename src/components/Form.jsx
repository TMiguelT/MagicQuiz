import React from 'react';
import {observer} from 'mobx-react';

import NewQuiz from '../forms/NewQuiz';

const form = new NewQuiz();

@observer
export default class Form extends React.Component {

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
                <button type="submit" onClick={form.onSubmit}>Submit</button>
                <button type="button" onClick={form.onClear}>Clear</button>
                <button type="button" onClick={form.onReset}>Reset</button>

                <p>{form.error}</p>
            </form>
        );
    }
}
