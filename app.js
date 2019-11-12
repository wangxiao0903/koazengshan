const Koa =require('koa');
const app= new Koa();
const path=require('path');

const static=require('koa-static');
//处理静态资源
app.use(static(path.join(process.cwd(),'public')));
//静态资源接口
const bodyparser=require('koa-bodyparser')
//路由 接口

const query = require('./db/query')


//引入封装的query
const router=require('koa-router')();

app.use(bodyparser());


app.use(router.routes());
app.use(router.allowedMethods());
router.get('/api/list',async (ctx,next) => {
    //查找
    const data = await query('SELECT * from user')
    ctx.body = data
    next()
})

router.post('/api/add',async (ctx,next)=>{
    console.log(ctx.request.body);
    let name=ctx.request.body.username;
    let id=ctx.request.body.id
    //增加
    await query('INSERT INTO user (username,id) value (?,?)',[name,id])
})
//删除
router.get('/api/rem',async(ctx,next)=>{
    let {id}=ctx.query;
    if(id ||id==0){
        try{
            await query('delete from user where id=? ',[id])
            ctx.body={
                code:1,
                msg:"cd"
            }
        }catch{

        }
    }else{
        
    }
    
})
//修改
router.post('/api/edit',async ctx=>{
    let {username,id}=ctx.request.body;
   
    if(username && id){
        try{
          
            await query('update user set username=? where id=?',[username,id])
            ctx.body={
                code:1,
                msg:"成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数缺失"
        }
    }
})
//模糊搜索
router.get('/api/search',async ctx=>{
    let {key}=ctx.query;
    let sql='';
    if(!key){
        sql='select * from list';
    }else{
        sql=`select * from list where name like '%${key}%'`
    }
    try{
        let list= await query(sql);
        ctx.body={
            code:1,
            data:list
        }
    }catch(e){
          ctx.body={
              code:0,
              msg:e.error
          }  
    }
})



app.listen(3000,()=>{
    console.log('服务器成功');
})
