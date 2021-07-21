const express=require('express');//다운받은 express modlue를 가져오기
const app=express();//express 사용해서 새로운 앱을 만든다
const port=5000

const {User}=require("./server/models/User");
//여기서 User에 왜 중괄호???
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const config=require('./server/config/key');
const {auth}=require('./server/middleware/auth');


//client에서 오는ㄴ 정보를 server에서 분석해서 가져올 수 있게 한다
//application/x-www-form-urlencoded 형태를 분석해 가져올 수 있다
app.use(express.urlencoded({extended:true,limit:'100mb'}));
//json형태를 분석해서 가져온다
app.use(express.json({limit:'100mb'}));
app.use(cookieParser());

const mongoose=require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('mongodb connected'))
  .catch(err=>console.log(err))


app.get('/',(req,res)=>res.send("hello world! NEW server"));
//5000번 포트의 root 에서 이걸 실행, server -> client

app.get('/api/hello',(req,res)=>{
  res.send('Hello world!');
})
//client가 server에게 보내는 정보를 body parser를 사용해 받아올 수 있다
app.post('/api/users/register',(req,res)=>{
  //회원가입 정보 가져오고 그 정보를 db에 저장한다 : user model 사용!
  const user=new User(req.body);//bodyParser를 이용해서 req로 받은 User model의 body부부능ㄹ 가져온다
  //정보를 user model에 저장
  //postman에서 data 보낼 때 raw, json으로 설정하여 보내야한다! 
  console.log(user);

  user.save((err,userInfo)=>{
    if(err){
      return res.json({success:false,err});
    }
    return res.status(200).json({
      success:true//성공시! 
    });
  })

})

app.post('/api/users/login',(req,res)=>{
  console.log("login backend /  email:", req.body.email," pwd: ",req.body.password);
  //요청된 email을 db상에서 찾는다
  User.findOne({email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({loginSuccess:false,message:"email not exist"});
    }

     //존재시, 비밀번호 체크   comparePassword는 user.js에서 userSchema와 관련지어 만든 함수
    
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch){
        //pwd 일치하는거 없을 때
        return res.json({loginSuccess:false,message:"password fail"});
      }
      //일치하는 pwd 있을 때는 isMatch가 제대로 돌아오므로, 토큰 생성!
      user.generateToken((err,user)=>{
        if(err){
          return res.status(400).send(err);
        }
        //여기서 받아온 user안에 user.js에서 생성하고 저장한 토큰이 들어있다.
        //cookie에 저장하는 방법 사용!
        res.cookie("x_auth",user.token).status(200).json({loginSuccess:true,message:"genereated token"});    })
    });
  });
 
});

app.get('/auth',auth,(req,res)=>{
  //auth: middleware, req 받은 후 callback하기 전에 중간에서 작업을 해주는 역할
  //여기까지 수행되었다면 auth는 된것!
  res.status(200).json({
    _id:req.user._id,//auth에서 req에 값 넣었으므로 가능
    isAdmin:req.user.role===0?false:true,//role을 무엇으로 지정했냐에 따라 달라질 수 있는 부분
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    role:req.user.role,
    //image:req.user.image
  })
})

app.get('/api/users/logout',auth,(req,res)=>{//res와 req의 순서 ->  앞에 쓴거: request에 대한것 
  //함수를 인자로 받는 것: callback
  //arrow function 전체가 callback 함수다! 
  User.findOneAndUpdate({
    _id:req.user._id
  },{token:""},
  (err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({success:true})
  })
})

app.listen(port,()=>console.log('example app listening on port '+port));
//nodemon: 서버를 매번 재실행 시키지 않아도 결과가 즉각적으로 반영된다
