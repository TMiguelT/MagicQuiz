import {observable, action, computed} from "mobx";
import ScryfallClient from "scryfall-client";

const scryfall = new ScryfallClient();

import shuffle from "lodash.shuffle";

class Quiz {
    @observable quizData;
    @observable quizLength = 0;
    @observable cards = [];
    @observable _quizState = "setup";
    @observable answers = [];
    @observable totalCards = 0;
    @observable showSnackbar = false;

    /**
     * Returns the proportion of cards loaded
     */
    @computed get percentLoaded(){
        return (this.cards.length / this.totalCards) * 100
    }

    @computed get quizState() {
        if (this.quizFinished)
            return "finished";
        else
            return this._quizState;
    }

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
        this.showSnackbar = true;
    }

    @action togglePopup(show) {
        this.showPopup = show;
    }

    @action resetQuiz() {
        this.cards = [];
        this.totalCards = 0;
        this._quizState = "setup";
        this.answers = [];
    }

    @action startQuiz(quizData) {
        this.resetQuiz();
        this.query = quizData.query;
        this.quizLength = parseInt(quizData.quizLength);
        this._quizState = "loading";

        scryfall.get("cards/search", {q: this.query})
            .then(this.receiveCards.bind(this));
    }

    @action receiveCards(list) {
        // Update the total number of results, for the progress bar
        this.totalCards = list.total_cards;

        // Add the new cards
        for (let card of list)
            this.cards.push(card);

        if (list.has_more)
        // If there are more cards, request them
            list.next().then(this.receiveCards.bind(this));
        else {
            // If there aren't, shuffle the cards and start the quiz
            this.cards.replace(shuffle(this.cards));
            this._quizState = 'started'
        }
    }
}

export default new Quiz();
