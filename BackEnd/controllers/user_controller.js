module.exports = function () {
  var userService = require('../services/user_service.js')
  require('../utils/common.js')()

  this.loginUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var loginUserService = await userServiceObject.loginUserService(req)
    if (loginUserService.error == 'true') {
      response.error = 'true'
      response.message = loginUserService.message
    } else {
      response.error = 'false'
      response.message = loginUserService.message
      response.data = loginUserService.result
    }
    callback(response)
  }

  this.createAccountUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var createAccountUserService = await userServiceObject.createAccountUserService(req)
    if (createAccountUserService.error == 'true') {
      response.error = 'true'
      response.message = createAccountUserService.message
    } else {
      response.error = 'false'
      response.message = createAccountUserService.message
      response.data = createAccountUserService.result
    }
    callback(response)
  }

  this.appSettingController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var appSettingService = await userServiceObject.appSettingService(req)
    if (appSettingService.error == 'true') {
      response.error = 'true'
      response.message = appSettingService.message
    } else {
      response.error = 'false'
      response.message = appSettingService.message
      response.data = appSettingService.result
    }
    callback(response)
  }

  this.payFromWalletController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var payFromWallet = await userServiceObject.payFromWalletService(req)
    if (payFromWallet.error == 'true') {
      response.error = 'true'
      response.message = payFromWallet.message
    } else {
      response.error = 'false'
      response.message = payFromWallet.message
      response.data = payFromWallet.result
    }
    callback(response)
  }

  this.payController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var payService = await userServiceObject.payService(req)
    if (payService.error == 'true') {
      response.error = 'true'
      response.message = payService.message
    } else {
      response.error = 'false'
      response.message = payService.message
      response.data = payService.result
    }
    callback(response)
  }

  this.deleteUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var deleteUser = await userServiceObject.deleteUserService(req)
    if (deleteUser.error == 'true') {
      response.error = 'true'
      response.message = deleteUser.message
    } else {
      response.error = 'false'
      response.message = deleteUser.message
      response.data = deleteUser.result
    }
    callback(response)
  }

  this.homeDashboardUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var homeDashboardUserService = await userServiceObject.homeDashboardUserService(req)
    if (homeDashboardUserService.error == 'true') {
      response.error = 'true'
      response.message = homeDashboardUserService.message
    } else {
      response.error = 'false'
      response.message = homeDashboardUserService.message
      response.data = homeDashboardUserService.result
    }
    callback(response)
  }

  this.getAllAddsUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var getAllAddsUserService = await userServiceObject.getAllAddsUserService(req)
    if (getAllAddsUserService.error == 'true') {
      response.error = 'true'
      response.message = getAllAddsUserService.message
    } else {
      response.error = 'false'
      response.message = getAllAddsUserService.message
      response.data = getAllAddsUserService.result
    }
    callback(response)
  }

  this.getMyAddressesUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var getMyAddressesService = await userServiceObject.getMyAddressesService(req)
    if (getMyAddressesService.error == 'true') {
      response.error = 'true'
      response.message = getMyAddressesService.message
    } else {
      response.error = 'false'
      response.message = getMyAddressesService.message
      response.data = getMyAddressesService.result
    }
    callback(response)
  }

  this.getMyProfileUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var getMyProfileUserService = await userServiceObject.getMyProfileUserService(req)
    if (getMyProfileUserService.error == 'true') {
      response.error = 'true'
      response.message = getMyProfileUserService.message
    } else {
      response.error = 'false'
      response.message = getMyProfileUserService.message
      response.data = getMyProfileUserService.result
    }
    callback(response)
  }

  this.updateProfileUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var updateProfileUser = await userServiceObject.updateProfileUserService(req)
    if (updateProfileUser.error == 'true') {
      response.error = 'true'
      response.message = updateProfileUser.message
    } else {
      response.error = 'false'
      response.message = updateProfileUser.message
      response.data = updateProfileUser.result
    }
    callback(response)
  }

  this.searchAddsUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var searchAddsUserService = await userServiceObject.searchAddsUserService(req)
    if (searchAddsUserService.error == 'true') {
      response.error = 'true'
      response.message = searchAddsUserService.message
    } else {
      response.error = 'false'
      response.message = searchAddsUserService.message
      response.data = searchAddsUserService.result
    }
    callback(response)
  }

  this.getDetailStoreViewController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var getDetailStoreViewService = await userServiceObject.getDetailStoreViewService(req)
    if (getDetailStoreViewService.error == 'true') {
      response.error = 'true'
      response.message = getDetailStoreViewService.message
    } else {
      response.error = 'false'
      response.message = getDetailStoreViewService.message
      response.data = getDetailStoreViewService.result
    }
    callback(response)
  }

  this.productCategorySearchController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var productCategorySearch = await userServiceObject.productCategorySearchService(req)
    if (productCategorySearch.error == 'true') {
      response.error = 'true'
      response.message = productCategorySearch.message
    } else {
      response.error = 'false'
      response.message = productCategorySearch.message
      response.data = productCategorySearch.result
    }
    callback(response)
  }

  this.productSearchController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var productSearch = await userServiceObject.productSearchService(req)
    if (productSearch.error == 'true') {
      response.error = 'true'
      response.message = productSearch.message
    } else {
      response.error = 'false'
      response.message = productSearch.message
      response.data = productSearch.result
    }
    callback(response)
  }

  this.getDetailProductCategoryViewController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var getDetailProductCategoryView = await userServiceObject.getDetailProductCategoryViewService(req)
    if (getDetailProductCategoryView.error == 'true') {
      response.error = 'true'
      response.message = getDetailProductCategoryView.message
    } else {
      response.error = 'false'
      response.message = getDetailProductCategoryView.message
      response.data = getDetailProductCategoryView.result
    }
    callback(response)
  }

  this.getListProductViewController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var getListProductView = await userServiceObject.getListProductViewService(req)
    if (getListProductView.error == 'true') {
      response.error = 'true'
      response.message = getListProductView.message
    } else {
      response.error = 'false'
      response.message = getListProductView.message
      response.data = getListProductView.result
    }
    callback(response)
  }

  this.getBestProductController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var getBestProduct = await userServiceObject.getBestProductService(req)
    if (getBestProduct.error == 'true') {
      response.error = 'true'
      response.message = getBestProduct.message
    } else {
      response.error = 'false'
      response.message = getBestProduct.message
      response.data = getBestProduct.result
    }
    callback(response)
  }

  this.homeSearchUserController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var homeSearchUserService = await userServiceObject.homeSearchUserService(req)
    if (homeSearchUserService.error == 'true') {
      response.error = 'true'
      response.message = homeSearchUserService.message
    } else {
      response.error = 'false'
      response.message = homeSearchUserService.message
      response.data = homeSearchUserService.result
    }
    callback(response)
  }

  this.updateDeviceTokenController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var updateDeviceTokenService = await userServiceObject.updateDeviceTokenService(req)
    if (updateDeviceTokenService.error == 'true') {
      response.error = 'true'
      response.message = updateDeviceTokenService.message
    } else {
      response.error = 'false'
      response.message = updateDeviceTokenService.message
      response.data = updateDeviceTokenService.result
    }
    callback(response)
  }

  this.updateAddressesController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var updateAddressesService = await userServiceObject.updateAddressesService(req)
    if (updateAddressesService.error == 'true') {
      response.error = 'true'
      response.message = updateAddressesService.message
    } else {
      response.error = 'false'
      response.message = updateAddressesService.message
      response.data = updateAddressesService.result
    }
    callback(response)
  }

  this.deleteAddressesController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var deleteAddressesService = await userServiceObject.deleteAddressesService(req)
    if (deleteAddressesService.error == 'true') {
      response.error = 'true'
      response.message = deleteAddressesService.message
    } else {
      response.error = 'false'
      response.message = deleteAddressesService.message
      response.data = deleteAddressesService.result
    }
    callback(response)
  }

  this.addAddressesController = async (req, callback) => {
    var response = {}
    var userServiceObject = new userService()
    var addAddressesService = await userServiceObject.addAddressesService(req)
    if (addAddressesService.error == 'true') {
      response.error = 'true'
      response.message = addAddressesService.message
    } else {
      response.error = 'false'
      response.message = addAddressesService.message
      response.data = addAddressesService.result
    }
    callback(response)
  }

}
