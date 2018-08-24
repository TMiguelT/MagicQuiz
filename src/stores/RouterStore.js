import { RouterStore } from 'mobx-react-router';
import {observable, action, computed} from 'mobx';
import queryString from 'query-string';

class QuizRouterStore extends RouterStore {
    @computed
    get queryParams(){
        return queryString.parse(this.location.search);
    }
}

export default new QuizRouterStore();
