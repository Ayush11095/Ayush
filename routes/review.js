var services = require('../controllers/review');
module.exports = function (router) {
//this route is used to call review controller to insert new record in review collection
router.post('/review', function (req, res) {
    services.create_review(req,res);
})
//this route is used to call review controller to retrieving record from review collection
router.get('/review/:p_id', function (req, res) {
    services.show_product_reviews(req,res);
})
//this route is used to call review controller to delete record from review collection
router.delete('/review/:p_id/:id', function (req, res) {
    services.delete_review(req,res);
})
//this route is used to call review controller to update record in review collection
router.put('/review/:p_id/:id', function (req, res) {
    services.update_review(req,res);
})
}