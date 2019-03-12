const models = require('../db/models');
exports.get = async (req, res) => {
    try{
        // select filters
        let filters = req.query;
        filters.status = 1;
        // execute query and send data
        res.send({
            data: await models.Document.findAll({ where: filters })
        });
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}

exports.post = async (req, res) => {
    try{
        // get request body
        let document = req.body;
        // get documents and verify if exists document with the same name
        const documents = await models.Document.findAll({ where: { description: req.body.description } });
        if(!documents.length){
            // set status active and creating document
            document.status = 1;
            res.status(201).send({id: (await models.Document.create(document)).id});
        }else{
            res.status(400).send({ msg: "Item already exists." });
        }
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}