module.exports = function () {
  var orderServices = require('../../services/store_manager/order_service');
  require('../../utils/common.js')()

  
  this.addcartController = async(req,callback)=>{
    var response = {}
    var orderServiceObject = new orderServices()
    var addtocart = await orderServiceObject.addtocart(req)
    if (addtocart.error == 'true') {
      response.error = 'true'
      response.message = addtocart.message
    } else {
      response.error = 'false'
      response.message = addtocart.message
      response.data = addtocart.result
    }
    callback(response)
} 

this.addwishlistController = async(req,callback)=>{
  var response = {}
  var orderServiceObject = new orderServices()
  var addtocart = await orderServiceObject.addtowishlist(req)
  if (addtocart.error == 'true') {
    response.error = 'true'
    response.message = addtocart.message
  } else {
    response.error = 'false'
    response.message = addtocart.message
    response.data = addtocart.result
  }
  callback(response)
} 

this.getAllordersController = async(req,callback)=>{
  var response = {}
  var orderServiceObject = new orderServices()
  var getAllordersService = await orderServiceObject.getAllordersService(req)
  if (getAllordersService.error == 'true') {
    response.error = 'true'
    response.message = getAllordersService.message
  } else {
    response.error = 'false'
    response.message = getAllordersService.message
    response.data = getAllordersService.result
  }
  callback(response)
}

this.getsalesgraphController = async(req,callback)=>{
  var response = {}
  var orderServiceObject = new orderServices()
  var getAllordersService = await orderServiceObject.getsalesGraphService(req)
  if (getAllordersService.error == 'true') {
    response.error = 'true'
    response.message = getAllordersService.message
  } else {
    response.error = 'false'
    response.message = getAllordersService.message
    response.data = getAllordersService.result
  }
  callback(response)
}

this.getordersController = async(req,callback)=>{
  var response = {}
  var orderServiceObject = new orderServices()
  var getordersService = await orderServiceObject.getordersService(req)
  if (getordersService.error == 'true') {
    response.error = 'true'
    response.message = getordersService.message
  } else {
    response.error = 'false'
    response.message = getordersService.message
    response.data = getordersService.result
  }
  callback(response)
}
  this.updateDeviceTokenController = async (req, callback) => {
    var response = {}
    var storeServiceObject = new storeService()
    var updateDeviceTokenService = await storeServiceObject.updateDeviceTokenService(req)
    if (updateDeviceTokenService.error == "true") {
        response.error = "true"
        response.message = updateDeviceTokenService.message
    } else {
        response.error = "false"
        response.message = updateDeviceTokenService.message
        response.data = updateDeviceTokenService.result
    }
    callback(response)
}
}