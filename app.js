const { default: multer } = require('fastify-multer/lib/lib/content-parser');

const fastify = require('fastify')({logger:true});

fastify.register(require('fastify-swagger'),{
    exposeRoute:true,
    routePrefix:'/docs',
    swagger:{
        info:{title:'fastfy-api'}
    }
})

fastify.register(multer)

fastify.register(require('./routes/docx'))


const start = async()=>{
    try{
        await fastify.listen( process.env.PORT || 8080)
    }catch(err){
        console.log(err);
    }
}

start();