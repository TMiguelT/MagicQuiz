import {observable} from 'mobx';

export default class Quiz {
    @observable points;
    @observable form;
    @observable questionNumber;
    @observable cards = [];

    constructor(searchParams) {
        this.searchParams = searchParams;
    }
}
