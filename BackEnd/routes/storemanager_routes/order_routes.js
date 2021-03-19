module.exports = function (app, validator) {
    var orderPath = '/orders'
    require('../../utils/error.js')()
    var orderController = require('../../controllers/store_manager/order_controller.js');

   
    // app.get(orderPath + '/getAllorders', function (request, response) {
    //   var lang = request.headers.lang
    //   var orderControllerObject = new orderController()
    //   orderControllerObject.getAllordersController(request.body, function (result) {
    //     this.ctrlHandler([result], result.error, lang, (message) => {
    //       return response.send(message)
    //     })
    //   })
    // })
    // app.get(orderPath + '/getsaleslist', function (request, response) {
    //   var lang = request.headers.lang
    //   var orderControllerObject = new orderController()
    //   orderControllerObject.getsalesgraphController(request.body, function (result) {
    //     this.ctrlHandler([result], result.error, lang, (message) => {
    //       return response.send(message)
    //     })
    //   })
    // })
    // app.get(orderPath + '/getorders', function (request, response) {
    //   var lang = request.headers.lang
    //   var orderControllerObject = new orderController()
    //   orderControllerObject.getordersController(request.body, function (result) {
    //     this.ctrlHandler([result], result.error, lang, (message) => {
    //       return response.send(message)
    //     })
    //   })
    // })
    // app.post(orderPath + '/addcart', function (request, response) {
    //   var lang = request.headers.lang
    //   var orderControllerObject = new orderController()
    //   orderControllerObject.addcartController(request.body, function (result) {
    //     this.ctrlHandler([result], result.error, lang, (message) => {
    //       return response.send(message)
    //     })
    //   })
    // })
    // app.post(orderPath + '/addwishlist', function (request, response) {
    //   var lang = request.headers.lang
    //   var orderControllerObject = new orderController()
    //   orderControllerObject.addwishlistController(request.body, function (result) {
    //     this.ctrlHandler([result], result.error, lang, (message) => {
    //       return response.send(message)
    //     })
    //   })
    // })

}