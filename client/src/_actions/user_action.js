import axios from 'axios';
import {LOGIN_USER,REGISTER_USER} from './types';

//loginPage에서 dispatch로 body부분을 loginUser에 인자로 넣어 함수 호출, 
//dataToSubmit에 해당 데이터들이 전달됨(email, pwd)
export function loginUser(dataToSubmit){
    //사용자가 입력한 정보를 action, 즉 객체로 만들어서 return! 

    //body부분을 login url로 보내면 백에서 해당 값 받아 처리
        //request는 이렇게 action 에서 따로 지정하여 사용! 
        //서버에서 받은 데이터를 request에 저장
    const request=axios.post('/api/users/login',dataToSubmit)
        .then(response=>response.data)

        console.log("request in loginUser: ",request);
    return{
        
        type:LOGIN_USER,//reducer에서 어떤 종류의 request인지 확인하기 위해
        payload:request//post요청을 담고 있다.....! 
    }
        
}


export function registerUser(dataToSubmit){
    //사용자가 입력한 정보를 action, 즉 객체로 만들어서 return! 

    //body부분을 login url로 보내면 백에서 해당 값 받아 처리
        //request는 이렇게 action 에서 따로 지정하여 사용! 
        //서버에서 받은 데이터를 request에 저장
    const request=axios.post('/api/users/register',dataToSubmit)
        .then(response=>response.data)

        console.log("request in registerUser: ",request);
    return{
        
        type:REGISTER_USER,//reducer에서 어떤 종류의 request인지 확인하기 위해
        payload:request//post요청을 담고 있다.....! 
    }
        
}