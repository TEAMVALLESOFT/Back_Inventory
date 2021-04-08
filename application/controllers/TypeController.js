const db = require ('../models');


exports.add = async(req,res,next)=>{
    try{  
        const typee = await db.article_type.findOne({where: {article_type_name: req.body.article_type_name}});

        if(typee){
            res.status(409).send({
                message: 'El tipo de artículo deseado ya existe.'
            })
        }
        else{
            const Object = await db.article_type.create(req.body);
            if(Object){
                res.status(200).send({
                    message: 'Tipo de artículo creado exitosamente.'
                 });
            }
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
        const ListA =await db.article_type.findAll()
        if(ListA){

            res.status(200).json(ListA);
        }else{

            res.status(204).send({
                message:'No hay registros en el sistema'
            });
        }
        //return res.json(ListA)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went went wrong'})

    } 
};

exports.ListbyClassif  = async(req,res,next)=>{

    try{
        const {classif} = req.params;
        const type = await db.article_type.findAll({
            where: {classif: classif}
        });
        if(type){
            res.status(200).json(type);
        }else{
            res.status(404).send({
                message:'No se encontraron registros.'
            });
        }
    }catch(err){
        return res.status(500).json({error: '¡Error en el servidor!.'});
    } 
};
