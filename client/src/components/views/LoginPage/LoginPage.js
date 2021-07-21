import axios from 'axios';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';

//email, pwd 위한 state를 만들어주어야 한다! 
function LoginPage(props) {
    const dispatch=useDispatch();//dispatch는 action을 취할 때 사용..? 
    const [email,setEmail]=useState("");
    const [pwd,setPassword]=useState("");
    //생성자의 역할, 아래에서 입력받는 값과 연결지어준다. 
    //타이핑을 할 때, state가 바뀌면서 form의 value도 바뀌는 형식
    //타이핑하는 이벤트 발생을 감지해야하므로, 각 input에 변화가 발생했을 시 동작을 처리할 함수를 지정해준다! 
    
    //이메일이나 pwd에 change생기면, event Handler 동작 -> 생성자 사용해서 email, pwd value에 값 저장
    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value);//위의 setEmail로 value를 바꿔줄 수 있음. 
    }
    const onPwdHandler=(event)=>{
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        console.log(email,pwd);

        //client가 입력한 값을 서버에 보내는 것: axios 이용! 
        let body={
            email:email,
            password:pwd
        }

        console.log("body: ",body);
        dispatch(loginUser(body))//loginUser는 actions폴더에 만들것임!
            .then(response=>{
                //노드 서버에서 보내온 정보 반영! 
                if(response.payload.loginSuccess){
                    //로그인 성공 시, landing page로 이동
                    props.history.push('/')
                }else{
                    alert('error');
                }
            })
        


    }
    return (
        <div style={{display:'flex', justifyContent:'center', width:'100%',
        height:'100vh'}}>
            <form style={{display:'flex',flexDirection:'column'}}
                onSubmit={onSubmitHandler}>
                <label>email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>password</label>
                <input type="password" value={pwd} onChange={onPwdHandler} />
                <br/>

                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
