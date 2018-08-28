import { RouterStore } from 'mobx-react-router';
import {computed} from 'mobx';
import queryString from 'query-string';

import createBrowserHistory from "history/createBrowserHistory";
import {syncHistoryWithStore} from "mobx-react-router";


class QuizRouterStore extends RouterStore {
    @computed
    get queryParams(){
        return queryString.parse(this.location.search);
    }
    
    @computed
    get query() {
        return this.queryParams.query;
    }
    
    @computed
    get clues() {
        return this.queryParams.clues;
    } 
    
    @computed
    get length() {
        return this.queryParams.quizLength;
    }
    
    @computed
    get hasStarted() {
        return this.queryParams;
    }
}

const browserHistory = createBrowserHistory();
export const routerStore = new QuizRouterStore();
export const history = syncHistoryWithStore(browserHistory, routerStore);

export default routerStore;
