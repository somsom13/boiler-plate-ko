const express=require('express');//다운받은 express modlue를 가져오ㅗㄱ
const app=express();//express 사용해서 새로운 앱을 만든다
const port=5000

const {User}=require("./models/User");
//여기서 User에 왜 중괄호???
const bodyParser=require('body-parser');

const config=require('./config/key');

//client에서 오는ㄴ 정보를 server에서 분석해서 가져올 수 있게 한다
//application/x-www-form-urlencoded 형태를 분석해 가져올 수 있다
app.use(express.urlencoded({extended:true,limit:'100mb'}));
//json형태를 분석해서 가져온다
app.use(express.json({limit:'100mb'}));

const mongoose=require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('mongodb connected'))
  .catch(err=>console.log(err))


app.get('/',(req,res)=>res.send("hello world! NEW server"));
//5000번 포트의 root 에서 이걸 실행, server -> client

//client가 server에게 보내는 정보를 body parser를 사용해 받아올 수 있다
app.post('/register',(req,res)=>{
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

//nodemon: 서버를 매번 재실행 시키지 않아도 결과가 즉각적으로 반영된다

app.listen(port,()=>console.log('example app listening on port '+port));