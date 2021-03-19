module.exports = function (app, validator) {
  var storemanagerPath = '/storemanager'
  require('../../utils/error.js')()
  var storeManagerController = require('../../controllers/store_manager/storeManager_controller')
  var userProductService = require('../../services/product_service')
  var StoreManagerService = require('../../services/store_manager/storeManager_service')
  var orderService = require('../../services/store_manager/order_service')
  var userService = require('../../services/user_service')
  var userController = require('../../controllers/user_controller.js')
  var storeProduct = require('../../services/store_manager/product_service')
  var storeReportService = require('../../services/store_manager/report_service')

  app.post(storemanagerPath + '/login', [
    validator.check('countryCode').isLength({ min: 1, max: 4 }).withMessage('INVALID: $[1], Country Code'),
    validator.check('mobileNumber').isLength({ min: 7, max: 18 }).withMessage('INVALID: $[1], Mobile Number')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeManagerControllerObject = new storeManagerController()
      storeManagerControllerObject.loginUserController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  app.get(storemanagerPath + '/getMyProfile', app.auth, function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    request.body.storeId = request.params.auth.storeId
    var StoreManagerServiceObject = new StoreManagerService()
    StoreManagerServiceObject.getMyProfileUserService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.get(storemanagerPath + '/dashboard', app.auth, function (request, response) {
    var lang = request.headers.lang
    // console.log(request.params)
    request.body.id = request.params.auth.id
    request.body.storeId = request.params.auth.storeId
    var StoreManagerServiceObject = new StoreManagerService()
    StoreManagerServiceObject.storemanagerDashboardService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(storemanagerPath + '/updateProfile', app.auth, [
    validator.check('firstName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], firstName'),
    validator.check('lastName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lastName'),
    validator.check('email').isEmail().withMessage('INVALID: $[1], Email'),
    validator.check('mobileNumber').isLength({ min: 7, max: 18 }).withMessage('INVALID: $[1], Mobile Number'),
    validator.check('gender').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Gender'),
    validator.check('dob').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], DOB')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var StoreManagerServiceObject = new StoreManagerService()
      StoreManagerServiceObject.updateProfileStoremanagerService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/updateOnlineStatus', app.auth, [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var StoreManagerServiceObject = new StoreManagerService()
      StoreManagerServiceObject.updateOnlineStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/updateStoreStatus', app.auth, [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var StoreManagerServiceObject = new StoreManagerService()
      StoreManagerServiceObject.updateStoreStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/updateDeviceToken', app.auth, [
    validator.check('os').isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1], OS'),
    validator.check('fcmToken').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Firebase Token')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeManagerControllerObject = new storeManagerController()
      storeManagerControllerObject.updateDeviceTokenController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Orders

  app.post(storemanagerPath + '/ongoingOrderList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
    // validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var orderServiceObject = new orderService()
      orderServiceObject.managerOngoingOrderListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/orderList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var orderServiceObject = new orderService()
      orderServiceObject.managerOrderListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/updateOrderStatus', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('status').trim().exists().isIn(['ACCEPTED', 'REJECTED', 'ONGOING']).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var orderServiceObject = new orderService()
      orderServiceObject.managerUpdateOrderStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/viewOrder', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var orderServiceObject = new orderService()
      orderServiceObject.managerViewOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Product Management
  app.get(storemanagerPath + '/homeDashboard', app.auth, function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    request.body.storeId = request.params.auth.storeId
    var storeProductObject = new storeProduct()
    storeProductObject.homeDashboardUserService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(storemanagerPath + '/getProductCategory', app.auth, [
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.getProductCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/getProductSubCategory', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userServiceObject = new userService()
      userServiceObject.getProductSubCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/viewBestProducts', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.viewBestProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/getproductlist', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    // validator.check('productList').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('type').isIn(['CATEGORY', 'SUBCATEGORY']).withMessage('Invalid type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.getProductListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/getproductOutOfStock', app.auth, [
    validator.check('type').isIn(['LOWSTOCK', 'OUTOFSTOCK']).withMessage('Invalid type'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.getproductOutOfStockService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/viewProductDetails', app.auth, [
    validator.check('productId').trim().exists().isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], productId ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.viewProductDetails(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/viewRelatedProduct', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userProductServiceObject = new userProductService()
      userProductServiceObject.viewRelatedProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/productSearch', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID'),
    validator.check('name').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], name'),
    validator.check('type').isIn(['CATEGORY', 'SUBCATEGORY']).withMessage('Invalid type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.productSearchService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Orders

  app.post(storemanagerPath + '/deleteOrderItems', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.deleteOrderItemService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/replaceOrderItems', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], ID'),
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId'),
    validator.check('quantity').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], quantity'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.replaceOrderItemService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/updateStock', app.auth, [
    validator.check('productPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productPrice'),
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId'),
    validator.check('storeStock').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeStock')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.updateStockService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(storemanagerPath + '/getStoreVendorList', app.auth, function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    request.body.storeId = request.params.auth.storeId
    var orderServiceObject = new orderService()
    orderServiceObject.getStoreVendorListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(storemanagerPath + '/viewStockHistory', app.auth, [
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.viewStockHistoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/changeStoreProduct', app.auth, [
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId'),
    validator.check('storeProductStatus').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeProductStatus')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.changeStoreProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/changeStoreCategoryProduct', app.auth, [
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId'),
    validator.check('storeProductStatus').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeProductStatus')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.changeStoreCategoryProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/addStoreVendor', app.auth, [
    validator.check('vendorName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], vendorName')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var orderServiceObject = new orderService()
      orderServiceObject.addStoreVendorService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/newProductList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.newProductListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/searchNewProduct', app.auth, [
    validator.check('text').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], text'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type')
    // validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.searchNewProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/addnewProduct', app.auth, [
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId'),
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.addnewProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/updateStoreStock', app.auth, [
    validator.check('vendorId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], vendorName'),
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId'),
    validator.check('stockType').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], stockType'),
    validator.check('units').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], units'),
    validator.check('currentStock').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], currentStock'),
    validator.check('StockReason').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], StockReason'),
    validator.check('expiryDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], expiryDate')  
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeProductObject = new storeProduct()
      storeProductObject.updateStoreStockService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // report
  app.get(storemanagerPath + '/getReport', app.auth, function (request, response) {
    var lang = request.headers.lang
    // console.log(request.params)
    request.body.id = request.params.auth.id
    request.body.storeId = request.params.auth.storeId
    var storeReportObject = new storeReportService()
    storeReportObject.managerDashboardgetReportService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(storemanagerPath + '/viewOrderHistory', app.auth, [
    validator.check('from').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], from'),
    validator.check('to').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], to')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeReportObject = new storeReportService()
      storeReportObject.viewOrderHistoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(storemanagerPath + '/profileDashBoard', app.auth, function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    request.body.storeId = request.params.auth.storeId
    var storeReportObject = new storeReportService()
    storeReportObject.managerProfileDashBoardService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })


  app.post(storemanagerPath + '/OrderTransactionLog', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('fromDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], fromDate'),
    validator.check('toDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], toDate')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      request.body.storeId = request.params.auth.storeId
      var storeReportObject = new storeReportService()
      storeReportObject.OrderTransactionLogService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(storemanagerPath + '/managerNotification', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      var storeReportObject = new storeReportService()
      storeReportObject.managerNotificationService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

}
