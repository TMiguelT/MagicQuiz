import {observable, action, computed} from "mobx";
import ScryfallClient from "scryfall-client";

const scryfall = new ScryfallClient();

import shuffle from "lodash.shuffle";

class Quiz {
    @observable quizData;
    @observable quizLength = 0;
    @observable cards = [];
    @observable started = false;
    @observable answers = [];

    @computed get quizFinished() {
        return this.questionNumber > 1 && this.questionNumber >= this.quizLength;
    }

    @computed get currentQuestion() {
        if (this.cards.length === 0)
            return null;
        else
            return this.cards[this.questionNumber];
    }

    /**
     * Which question we are up to in the quiz
     */
    @computed get questionNumber() {
        return this.answers.length;
    }

    /**
     * Returns the proportion of questions answered correctly, as a float
     */
    @computed get successProportion() {
        return this.numCorrect / this.quizLength;
    }

    /**
     * Returns the number of questions answered correctly
     */
    @computed get numCorrect() {
        return this.answers.filter(el => el).length;
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
    }

    @action togglePopup(show) {
        this.showPopup = show;
    }

    @action resetQuiz() {
        this.cards = [];
        this.started = false;
        this.answers = [];
    }

    @action startQuiz(quizData) {
        this.resetQuiz();
        this.query = quizData.query;
        this.quizLength = parseInt(quizData.quizLength);
        this.started = true;

        scryfall.get("cards/search", {q: quizData.query})
            .then(action("fetchCards", list => {
                const allCards = [];
                for (let card of list)
                    allCards.push(card);
                this.cards.replace(shuffle(allCards));
            }));
    }
}

export default new Quiz();
