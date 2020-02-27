var services = require('../controllers/product');
module.exports = function (router) {
//this route is used to call product controller to update record in product collection
router.post('/product', function (req, res) {
services.create_product(req,res);
})
//this route is used to call product controller to update record in product collection
router.put('/product/:id', function (req, res) {
services.update_product(req,res);
})
//this route is used to call product controller to update record in product collection
router.delete('/product/:id', function (req, res) {
services.delete_product(req,res);
})
//this route is used to call product controller to update record in product collection
router.get('/product/:id', function (req, res) {
  services.show_user_products(req,res);
})

}