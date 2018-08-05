import {observable, action, computed} from 'mobx';
import ScryfallClient from 'scryfall-client';

const scryfall = new ScryfallClient();

import shuffle from 'lodash.shuffle';

class Quiz {
    @observable points = 0;
    @observable quizData;
    @observable questionNumber = 0;
    @observable cards = [];
    @observable started = false;
    @observable answers = [];

    @computed get currentQuestion() {
        return this.cards[this.questionNumber];
    }

    /**
     * Returns true if the user answered the last answer correctly
     */
    @computed get lastCorrect() {
        if (this.answers.length === 0)
            return false;
        else
            return this.answers.slice(-1)[0];
    }

    /**
     * Returns the name of the previous card
     */
    @computed get lastName() {
        if (this.questionNumber === 0)
            return null;
        else
            return this.cards[this.questionNumber - 1].name;
    }


    /**
     * True if the user has answered at least one question
     * @returns {boolean}
     */
    @computed get hasAnswered() {
        return this.answers.length > 0;
    }

    @action giveAnswer(correct) {
        this.answers.push(correct);
        if (correct)
            this.points++;
        this.questionNumber++;
    }

    @action togglePopup(show) {
        this.showPopup = show;
    }

    @action resetQuiz() {
        this.cards = [];
        this.started = false;
        this.questionNumber = 0;
        this.points = 0;
        this.answers = [];
    }

    @action startQuiz(quizData) {
        this.resetQuiz();
        this.quizData = quizData;
        this.started = true;

        scryfall.get('cards/search', {q: quizData.query})
            .then(action('fetchCards', list => {
                this.cards = shuffle(list);
            }));
    }
}

export default new Quiz();
