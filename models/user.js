const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
    },
    email:{
        type:String,
        trim:true,//입력한 이메일에서 스페이스 같은걸 자동으로 없애줌
        unique:1
    },
    password:{
        type:String,
        maxlength:5
    },
    lastName:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number//토큰의 유효기간
    }
})

const User=mongoose.model('User',userSchema);
//위에서 만든 userSchema를 User라는 이름의 모델로 생성한다
module.exports={User};//다른 파일에서도 사용가능하게