const router = require('express').Router();
const controller = require('../controllers/document');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/document-validators');
// applying authentication in all routes
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /documents List of documents
 * @apiName GetDocuments
 * @apiGroup Documents
 * 
 * @apiParam (Query params) {Int} page The page.
 * @apiParam (Query params) {String} order_by A column to order.
 * @apiParam (Query params) {String} order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) {Int} status Filter by status.
 * @apiParam (Query params) {Int} DocumentTypeId Filter by document type.
 * @apiParam (Query params) {Int} FunctionId Filter by collaborator function.
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of Documents
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "count": 2,
 *       "pages": 1,
 *       "rows": [
 *          {
 *              "id": 3,
 *              "description": "Documento Teste",
 *              "status": 1,
 *              "createdAt": "2019-03-06T02:29:06.613Z",
 *              "updatedAt": "2019-03-06T02:29:06.613Z",
 *              "DocumentTypeId": 5,
 *              "FunctionId": null
 *          },
 *          {
 *              "id": 4,
 *              "description": "Documento Teste",
 *              "status": 1,
 *              "createdAt": "2019-03-06T22:52:28.186Z",
 *              "updatedAt": "2019-03-06T22:52:28.186Z",
 *              "DocumentTypeId": 5,
 *              "FunctionId": 1
 *          }
 *       ]
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {post} /documents Create a new document
 * @apiName PostDocuments
 * @apiGroup Documents
 *
 * @apiParam (Request body) {String} description The function description.
 * @apiParam (Request body) {Int} DocumentTypeId The id of the document type.
 * @apiParam (Request body) {Int} FunctionId The id of the function.
 * 
 * @apiSuccess {Int} id Id of the document inserted
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 20,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {put} /documents/:id Update a document
 * @apiName PutDocuments
 * @apiGroup Documents
 *
 * @apiParam (Params) {Int} id The document id.
 * @apiParam (Request body) {String} description The function description.
 * @apiParam (Request body) {Int} DocumentTypeId The id of the document type.
 * @apiParam (Request body) {Int} FunctionId The id of the function.
 * @apiParam (Request body) {Int} status 1 to enable the document and 0 to disable.
 * 
 * @apiSuccess {Int} updated 1 if was updated or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 200 OK
 *    {
 *        "updated": 1,
 *        "msg": "Alterado com sucesso."
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

/**
 * @api {delete} /documents/:id Delete a document
 * @apiName DeleteDocuments
 * @apiGroup Documents
 *
 * @apiParam (Params) {Int} id The document id.
 * 
 * @apiSuccess {Int} deleted 1 if was deleted or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 200 OK
 *    {
 *        "deleted": 1,
 *        "msg": "Excluído com sucesso."
 *    }
 */
router.delete('/:id', validators.delete, expressValidator.findsValidatorErros(), controller.delete);

module.exports = router;