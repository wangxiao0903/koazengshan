const mysql=require('mysql');
//创建链接对象
let connection=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'root',
    port:'3306',
    database:'1705d'
})
//链接
connection.connect((error)=>{
    if(error){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
})

module.exports=connection