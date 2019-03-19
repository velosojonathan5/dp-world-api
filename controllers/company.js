const models = require('../db/models');
const { check, validationResult } = require('express-validator/check');

exports.get = async (req, res) => {
    try{
        res.send({
            data: await models.Company.findAll({where: req.query})
        });
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}

exports.post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let result = await models.Empresa.create({ cnpj: '33333333333333' });
    res.send(result);
}