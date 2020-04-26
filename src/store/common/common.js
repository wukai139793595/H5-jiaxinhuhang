
import mutations from './mutations.js';
import actions from './actions';
import getters from './getters';
import {getSessionStore} from "@/common/js/storage.js";
let user = getSessionStore('user') ?JSON.parse(getSessionStore('user')):{};
const common = {
    state: {       
        loading: false,   //请求接口时loading效果
        footerBar: true,
        user: user
    },
    mutations: mutations,
    actions: actions,
    getters: getters
}

export default common