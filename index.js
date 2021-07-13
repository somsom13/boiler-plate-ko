const express=require('express');//다운받은 express modlue를 가져오ㅗㄱ
const app=express();//express 사용해서 새로운 앱을 만든다
const port=5000

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://somin:somin@boilerplate.erqhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('mongodb connected'))
  .catch(err=>console.log(err))


app.get('/',(req,res)=>res.send("hello world!"));
//5000번 포트의 root 에서 이걸 실행

app.listen(port,()=>console.log('example app listening on port '+port));