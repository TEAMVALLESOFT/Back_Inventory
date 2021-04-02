const {TypeA} = require('../Config/db');


exports.add = async(req,res,next)=>{
    try{  
        const typee = await TypeA.findOne({where: {article_type_name: req.body.article_type_name}});

        if(typee){
            res.status(409).send({
                message: 'existe.'
            })
        }
        else{
            const typee = await TypeA.create(req.body);
            res.status(200).send({
                message: 'Tipo de articulo creado exitosamente.'
            });
        }
    }catch(error){
        res.status(500).send({
            message: 'Error en el servidor.'
        })
        next(error);
    }
};

exports.list  = async(req,res,next)=>{

    try{
        const ListA =await TypeA.findAll()
        if(ListA){

            res.status(200).json(ListA);
        }else{

            res.status(204).send({
                message:'No hay bodegas en el sistema'
            });
        }
        //return res.json(ListA)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went went wrong'})

    } 
};