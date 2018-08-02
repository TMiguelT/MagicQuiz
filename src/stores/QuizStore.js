import {observable, action} from 'mobx';
import ScryfallClient from 'scryfall-client';

const scryfall = new ScryfallClient();

class Quiz {
    @observable points;
    @observable form;
    @observable questionNumber;
    @observable cards = [];

    @action updateForm(form) {
        this.form = form.values();

        scryfall.get('cards/search', {q: this.form.query})
            .then(action('fetchCards', list => {
                this.cards = list
            }));
    }
}

export default new Quiz();
