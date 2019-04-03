const router = require('express').Router();
const controller = require('../controllers/company');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/company-validators');

/**
 * @api {get} /companies List of companies
 * @apiName GetCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Query params) {Int} page The page.
 * @apiParam (Query params) {String} order_by A column to order.
 * @apiParam (Query params) {String} order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) {Int} status Filter by status.
 * @apiParam (Query params) {String} cnpj Filter by cnpj.
 * @apiParam (Query params) {String} socialName  Filter by social name.
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of companies.
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 200 OK
 *     {
 *           "count": 1,
 *           "pages": 1,
 *           "rows": [
 *               {
 *                  "id": 37,
 *                  "cnpj": "32325649000999",
 *                  "socialName": "socialName Teste 1",
 *                  "businessName": "businessName Teste 2",
 *                  "address": "Av Afonso Pena 3148",
 *                  "number": "1",
 *                  "complement": "apto 101",
 *                  "district": "Funcionários",
 *                  "city": "Belo Horizonte",
 *                  "state": "MG",
 *                  "country": "Brazil",
 *                  "cep": "30130012",
 *                  "phone": "31989915622",
 *                  "inscricaoEstadual": "12354885",
 *                  "site": "http://www.semsite.com.br",
 *                  "createdAt": "2019-03-24T21:41:04.110Z",
 *                  "updatedAt": "2019-03-25T16:43:05.794Z",
 *                  "CompanyStatusId": 2,
 *                  "CompanyTypeId": 1,
 *                  "SectorId": 1,
 *                  "CompanyId": null,
 *                  "CompanyStatus": {
 *                      "id": 2,
 *                      "description": "Envio de documentos"
 *                  },
 *                  "CompanyType": {
 *                      "id": 1,
 *                      "description": "Estrangeiro"
 *                  }]
 *              }
 *           ]
 *       }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {post} /companies Create a new company
 * @apiName PostCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Request body) {String} cnpj Brazilian document number.
 * @apiParam (Request body) {String} socialName Social name.
 * @apiParam (Request body) {String} businessName List Business name.
 * @apiParam (Request body) {String} address The local of the company.
 * @apiParam (Request body) {String} number The street number.
 * @apiParam (Request body) {String} complement The complement address.
 * @apiParam (Request body) {String} district The district.
 * @apiParam (Request body) {String} city The city.
 * @apiParam (Request body) {String} state The state or province.
 * @apiParam (Request body) {String} country The country.
 * @apiParam (Request body) {String} cep The postal code.
 * @apiParam (Request body) {String} phone The phone number.
 * @apiParam (Request body) {String} inscricaoEstadual Brazilian document number.
 * @apiParam (Request body) {String} site Company web site.
 * @apiParam (Request body) {Int}    CompanyTypeId Company type.
 * @apiParam (Request body) {Int}    CompanyId If is outsourced, the id of the company contractor.
 * 
 * 
 * @apiSuccess {Int} id Companie inserted
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 19
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {put} /companies/:id Update a company
 * @apiName PutCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Params) {Int} id The company id.
 * @apiParam (Request body) {Int} SectorId Company sector.
 * @apiParam (Request body) {Int} CompanyStatusId Company sector.
 * 
 * @apiSuccess {Int} updated 1 if the item was updated or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 200 OK
 *    {
 *        "updated": 1
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

/**
 * @api {get} /companies/:id/contacts List of company contacts
 * @apiName GetCompaniesContact
 * @apiGroup Companies-Contact
 * 
 * @apiParam (Request body) {Int} id The company id.
 * 
 * @apiSuccess {Array} rows List of contacts
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 200 OK
 *    {
 *        "rows": []
 *    }
 */
router.get('/:id/contacts', validators.getContacts, expressValidator.findsValidatorErros(), controller.getContacts);

/**
 * @api {post} /companies/:id/contacts Create a new contact
 * @apiName PostCompaniesContact
 * @apiGroup Companies-Contact
 * 
 * @apiParam (Request body) {Int} id The company id.
 * @apiParam (Request body) {String} name The contact email.
 * @apiParam (Request body) {String} email The contact password.
 * 
 * @apiSuccess {Int} id Contact inserted
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 1,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/:id/contacts', validators.postContacts, expressValidator.findsValidatorErros(), controller.postContacts);

module.exports = router;