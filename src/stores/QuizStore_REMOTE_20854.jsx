import {observable, action, computed} from "mobx";
import ScryfallClient from "scryfall-client";
import XRegExp from "xregexp";

const scryfall = new ScryfallClient();

import shuffle from "lodash.shuffle";

const letterRegex = XRegExp("[^\\p{Letter}]+", "g");

/**
 * Represents a card recieved from the Scryfall API
 */
class ScryfallCard {
    symbol = /{(.)(\/(.))?}/g;

    fieldAsComponent(field) {
        let str = this[field];
        const matches = str.match(this.symbol);

        if (matches) {
            matches.forEach((symbol) => {
                const key = symbol.slice(1, -1);
                str = str.replace(symbol, `<img src=${ScryfallClient.symbols[key]}/>`);
            });
        }

        return str;
    }
}

class Quiz {
    @observable quizData;
    @observable quizLength = 0;
    @observable cards = [];
    @observable _quizState = "setup";
    @observable answers = [];
    @observable totalCards = 0;
    @observable showSnackbar = false;
    @observable clues = [];

    /**
     * Returns an array of boolean values, which are true if the player got that question correct, and false if they
     * got it incorrect
     */
    @computed get correctAnswers() {
        return new Array(this.quizLength).fill(null).map((_, i) => {
            return this.isCorrect(i);
        });
    }

    /**
     * Returns the proportion of cards loaded
     */
    @computed get percentLoaded() {
        return (this.cards.length / this.totalCards) * 100;
    }

    /**
     * The state of the quiz. Either "setup", "loading", "started" or "finished"
     */
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
     * Returns true if the question number provided was answered correctly
     * @param questionNumber
     */
    isCorrect(questionNumber) {

        // Remove all symbols and make everything lowercase
        const answer = this.answers[questionNumber].toLowerCase().replace(letterRegex, "");
        const correct = this.cards[questionNumber].name.toLowerCase().replace(letterRegex, "");

        return answer === correct;
    }

    /**
     * Returns true if the user answered the last answer correctly
     */
    @computed get lastCorrect() {
        if (this.questionNumber === 0)
            return false;
        else
            return this.isCorrect(this.answers.length - 1);
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
        this.clues = quizData.clues;
        this.quizLength = parseInt(quizData.quizLength);
        this._quizState = "loading";

        scryfall.get("cards/search", {q: this.query})
            .then(this.receiveCards.bind(this));
    }

    @action receiveCards(list) {
        // Update the total number of results, for the progress bar
        this.totalCards = list.total_cards;

        // Add the new cards, and give them a prototype
        for (let card of list)
            this.cards.push(Object.setPrototypeOf(card, ScryfallCard.prototype));

        if (list.has_more)
        // If there are more cards, request them
            list.next().then(this.receiveCards.bind(this));
        else {
            // If there aren't, shuffle the cards and start the quiz
            this.cards.replace(shuffle(this.cards));
            this._quizState = "started";
        }
    }
}

export default new Quiz();
