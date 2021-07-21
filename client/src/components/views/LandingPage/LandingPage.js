import React,{useEffect} from 'react'
import axios from 'axios';

function LandingPage() {
    //landingpage에 들어오자마자 실행되는 기능
    useEffect(()=>{
        axios.get('/api/hello')//서버에게 요청
        .then(response=>console.log(response.data));//index.js, 즉 서버로 부터 받은 response의 data를 띄워준다! 
    },[])
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:"center", width:'100%',
        height:'100vh'}}>
            <h2>LandingPage</h2>
            <button>LOGOUT</button>
        </div>
        
    )
}

export default LandingPage
