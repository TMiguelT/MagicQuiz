import { Form } from 'mobx-react-form';
import validatorjs from 'validatorjs';

export default class NewQuiz extends Form {
    plugins() {
        return {dvr: validatorjs};
    }

    setup() {
        return {
            fields: [{
                name: 'query',
                label: 'Search Term',
                placeholder: 't:legendary t:dragon',
                rules: 'required|string',
            }, {
                name: 'prompt',
                label: 'Prompt Type',
                placeholder: 'image',
                rules: 'required|string|in:image,flavour,stats,text',
            }]
        };
    }
    
    hooks(){
        return {
            onSuccess(form) {
                alert('Form is valid! Send the request here.');
                // get field values
                console.log('Form Values!', form.values());
            },
            onError(form) {
                alert('Form has errors!');
                // get all form errors
                console.log('All form errors', form.errors());
            }
        }
    }
}
