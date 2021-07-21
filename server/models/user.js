const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds=10;//salt round 값 (몇바퀴)
const jwt=require('jsonwebtoken');


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
        minlength:5
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

userSchema.pre('save',function(next){//callback function
    var user=this;//index.js에서 req.body를 파싱해 온 후, save하기 직전에 실행되는
    //함수이므로 user model을 가져오면 파싱된 req.body 내용을 가져올 수 있고, pwd를 가져올 수 있다!
    if(user.isModified('password')){
        //user의 pwd가 변환될 때만 암호화! 
    
        //비밀번호를 암호화 시킨다!
        console.log('password: '+user.password);
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) {return next(err);}//index.js로 err를 보낸다!
            //제대로 생성 시 아래과정 수행
            //console.log("user pwd: "+user.password);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) {return next(err);}//index.js의 save 부분으로 다시 넘어감
                user.password=hash;//hash된 값으로 user pwd값을 변경하여 저장
                //console.log(user.password);
                //변경된 결과를 반영한 상태로 다시 index.js의 save부분으로 돌아간다
                next();//index.js에서 model정보 저장하는 쪽으로 넘긴다
            });
        });
    }else{
        next();
    }
    

});//index.js에서 model에 유저정보를 저장하기 전에 무언가를 수행한다

/*comparePassword라는 userSchema 관련 메소드 생성! */

userSchema.methods.comparePassword=function(plainPassword,cb){
    console.log('compare pwd, pwd: '+this.password);
    //plainText형식의 비밀번호와 암호화된 비밀번호를 비교할 수 있어야한다
    //plainText를 암호화 한 후 비교해야 한다!
    //plainPassword로 넘어오는 값: user가 입력한 body 중 password에 해당하는 plaintext의 비밀번호
    //cb로 넘어오는 값: callback, isMatch
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        //index.js에서 넘어온 평문형태의 비밀번호와, 암호화되어 저장되어 있는 user model의 암호를 비교
        if(err){return cb(err);}
        cb(null,isMatch);//에러가 없다면 err로는 null, isMatch로는 isMatch callback 전달
    })
}

/* generateToken이라는 userSchema 관련 함수 생성! */

userSchema.methods.generateToken=function(cb){
    var user=this;
    var token=jwt.sign(user._id.toHexString(),'secretToken');//두 값을 사용해서 token을 생성하는 것!
    //jsonwebtoken을 이용해 token 생성!


    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user);
    })

}

/* cookie에서 user token 가져와, 회원인증에 사용하기 위한 함수 */

userSchema.methods.findByToken=function(token,cb){
    var user=this;

    //복호화한다!
    jwt.verify(token,'secretToken',function(err,decoded){
        //user id 사용 유저찾고, cookie의 토큰과 db의 토큰 일치하는지 확인! 

        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    });//token 가져오고, 첨에 토큰 만들 때 secretToken이라는 문자열과 합쳐 생성했으므로 
    //해당 부분은 제거하고 순수값만 찾아냄

}

const User=mongoose.model('User',userSchema);
//위에서 만든 userSchema를 User라는 이름의 모델로 생성한다
module.exports={User};//다른 파일에서도 사용가능하게