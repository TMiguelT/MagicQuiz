import { Form } from 'mobx-react-form';
import validatorjs from 'validatorjs';

import quizStore from '../stores/QuizStore'

export default class NewQuiz extends Form {
    plugins() {
        return {dvr: validatorjs};
    }

    setup() {
        return {
            fields: [{
                name: 'query',
                label: 'Search Term',
                rules: 'required|string',
                value: 'r:mythic s:m19'
            }, {
                name: 'prompt',
                label: 'Prompt Type',
                value: 'image',
                rules: 'required|string|in:image,flavour,stats,text',
            }]
        };
    }
    
    hooks(){
        return {
            onSuccess(form) {
                quizStore.startQuiz(form.values());
            },
            onError(form) {
                alert('Form has errors!');
                // get all quizData errors
                console.log('All quizData errors', form.errors());
            }
        }
    }
}
