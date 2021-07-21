import {LOGIN_USER,REGISTER_USER} from '../_actions/types';//type을 가져온 후, 

export default function(state={},action){
    switch(action.type){//type으로 비교
        case LOGIN_USER:
            return {...state,loginSuccess:action.payload};
            break;
        case REGISTER_USER:
            return {...state,register:action.payload};
            break;
        default:
            return state;

    }
}