const models = require('../db/models');
const { check, validationResult } = require('express-validator/check');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.Company.findAll({ where: req.query })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        // get request body
        let company = req.body;
        // get documents and verify if exists
        const companies = await models.Company.findAll({
            where: { 
                $or: [
                    {cnpj: company.cnpj},
                    {socialName: company.socialName},
                    {businessName: company.businessName}
                ]
            }
        });
        if (!companies.length) {
            // set status and create
            company.CompanyStatusId = 1;
            res.status(201).send({ 
                id: (await models.Company.create(company)).id 
            });
        } else {
            res.status(400).send({ msg: "Item already exists." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err})
    }
}