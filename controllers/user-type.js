const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.UserType.findAll()
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}
