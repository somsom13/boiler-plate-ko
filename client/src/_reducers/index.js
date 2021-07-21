import { combineReducers } from "redux";
import user from './user_reducer'

const rootReducer=combineReducers({
    user
})

export default rootReducer;//다른파일에서도 사용할 수 있도록

//만약 하나의 store안에 여러개의 reducer가 있으면, 여러 reducer들을 combine reducer로 모아서 관리하고, 얘네를 rootreducer라는 하나ㅢㅇ
//reducer로 합쳐 사용! 