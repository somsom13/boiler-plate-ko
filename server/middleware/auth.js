const {User}=require('../models/User');

let auth=(req,res,next)=>{
    //인증처리
    //client의 cookie에서 token 가져오고 해당 내용 복호화, 유저찾기 => cookieparser
    //유저 존재하면 인증 okay 
    //유저 없으면 인증 불가!!!!!!!

    let token=req.cookies.x_auth;//cookie에서 가져올 수 있음
    //user model에서 만든 함수 사용해 복호화
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false,error:true})

        req.token=token;//user 있을경우에만 수행!
        req.user=user;//req에 넣어주면 index.js에서 req.user했을 때 정보를 가질 수 있다
        next();
    })
}

module.exports={auth};