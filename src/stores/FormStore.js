import {Form} from "mobx-react-form";
import validatorjs from "validatorjs";

import quizStore from "./QuizStore";

class NewQuiz extends Form {
    plugins() {
        return {dvr: validatorjs};
    }

    setup() {
        return {
            fields: [
                {
                    name: "query",
                    label: "Search Term",
                    rules: "required|string",
                },
                {
                    name: "clues",
                    label: "Clue Type",
                    value: ["image"],
                    rules: "required|array|in:image,flavour,stats,text,type,mana,stats",
                    extra: [
                        { value: 'image', label: 'Image' },
                        { value: 'flavour', label: 'Flavour Text' },
                        { value: 'text', label: 'Rules Text' },
                        { value: 'type', label: 'Type Line' },
                        { value: 'mana', label: 'Mana Cost' },
                        { value: 'stats', label: 'Power/Toughness' },
                    ]
                },
                {
                    name: 'quizLength',
                    label: 'Quiz Length',
                    rules: "required|integer|between:5,100",
                    value: '10'
                }
            ]
        };
    }

    hooks() {
        return {
            onSuccess(form) {
                quizStore.startQuiz(form.values());
            }
        };
    }
}

export default new NewQuiz();
