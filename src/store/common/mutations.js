import {SET_USER,REMOVE_USER} from './mutation-types';
import {setSessionStore,removeSessionStore} from '@/common/js/storage.js';

const mutations = {
    [SET_USER](state,payload){
        setSessionStore('user',payload);
        state.user = payload;
    },
    [REMOVE_USER](state){
        removeSessionStore('user');
        state.user = {};
    }

}

export default mutations