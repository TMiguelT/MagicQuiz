import {Form} from "mobx-react-form";
import validatorjs from "validatorjs";

import quizStore from "../stores/QuizStore";

export default class NewQuiz extends Form {
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
                    value: "r:mythic s:m19"
                },
                {
                    name: "clues",
                    label: "Clue Type",
                    value: ["image"],
                    rules: "required|array|in:image,flavour,stats,text,type,mana",
                    extra: [
                        { value: 'image', label: 'Image' },
                        { value: 'flavour', label: 'Flavour Text' },
                        { value: 'text', label: 'Rules Text' },
                        { value: 'type', label: 'Type Line' },
                        { value: 'mana', label: 'Mana Cost' },
                    ]
                },
                {
                    name: 'quizLength',
                    label: 'Number of Questions',
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
            },
            onError(form) {
                alert("Form has errors!");
                // get all quizData errors
                console.log("All quizData errors", form.errors());
            }
        };
    }
}
