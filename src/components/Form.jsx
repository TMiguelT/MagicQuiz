import React from 'react';
import {observer} from 'mobx-react';

import NewQuiz from '../forms/NewQuiz';

const form = new NewQuiz();

import {Button, Form as BulmaForm, Card} from 'react-bulma-components/full';

@observer
export default class Form extends React.Component {

    render() {
        return (
            <form onSubmit={form.onSubmit}>
                <input hidden type="submit"/>
                <Card>
                    <Card.Header>
                        <Card.Header.Title>
                            Create your quiz
                        </Card.Header.Title>
                    </Card.Header>
                    <Card.Content>
                        <label htmlFor={form.$('query').id}>
                            {form.$('query').label}
                        </label>
                        <BulmaForm.Input {...form.$('query').bind()} />
                        <BulmaForm.Help>{form.$('query').error}</BulmaForm.Help>

                        {/*<label htmlFor={form.$('prompt').id}>*/}
                            {/*{form.$('prompt').label}*/}
                        {/*</label>*/}
                        {/*<BulmaForm.Input {...form.$('prompt').bind()} />*/}
                        {/*<BulmaForm.Help>{form.$('prompt').error}</BulmaForm.Help>*/}

                        <BulmaForm.Help>{form.error}</BulmaForm.Help>
                    </Card.Content>
                    <Card.Footer>
                        <Card.Footer.Item onClick={form.onSubmit} renderAs="a" href="#">
                            Create
                        </Card.Footer.Item>
                    </Card.Footer>
                </Card>
            </form>
        );
    }
}
