module.exports = function (app, validator) {
  var userPath = '/user'
  require('../utils/error.js')()
  var userController = require('../controllers/user_controller.js')
  var userService = require('../services/user_service')
  var productService = require('../services/product_service')

  app.post(userPath + '/login', [
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
      var userControllerObject = new userController()
      userControllerObject.loginUserController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/createAccount', [
    validator.check('firstName').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], First Name'),
    validator.check('lastName').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Last Name'),
    validator.check('gender').trim().exists().isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Last Name'),
    validator.check('countryCode').trim().exists().isLength({ min: 1, max: 4 }).withMessage('INVALID: $[1], Country Code'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 7, max: 18 }).withMessage('INVALID: $[1], Mobile Number'),
    validator.check('referralCode').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], Referral Code')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.createAccountUserController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // app.post(userPath + '/homeDashboard', [
  //   validator.check('id').trim().exists().isLength({ min: 1}).withMessage('INVALID: $[1], id')
  // ], function (request, response) {
  //   var lang = request.headers.lang
  //   var userServiceObject = new userService()
  //   userServiceObject.homeDashboardUserService(request.body, function (result) {
  //     response.send(result)
  //   })
  // })

  app.post(userPath + '/homeDashboard', app.setting, [
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userId'),
    validator.check('lat').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lat'),
    validator.check('lng').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lng'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.stIds = request.params.setting
      var userServiceObject = new userService()
      userServiceObject.homeDashboardUserService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  /* app.get(userPath + '/homeDashboard',app.auth, function (request, response) {
    var lang = request.headers.lang
    if(request.body.id !=''||request.body.id !=null){
      request.body.id =request.params.auth.id
    }
    var userServiceObject = new userService()
    userServiceObject.homeDashboardUserService(request.body, function (result) {
      response.send(result)
    })
  }) */
  app.post(userPath + '/getProductCategory', app.setting,  [
    validator.check('categoryId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID'),
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userId'),
    validator.check('lat').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lat'),
    validator.check('lng').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lng'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.stIds = request.params.setting
      var userServiceObject = new userService()
      userServiceObject.getProductCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getProductSubCategory', [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.stIds = request.params.setting
      var userServiceObject = new userService()
      userServiceObject.getProductSubCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getproductlist', app.setting, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('lat').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lat'),
    validator.check('lng').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lng'),
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userId'),
    validator.check('type').isIn(['CATEGORY', 'SUBCATEGORY']).withMessage('Invalid type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.stIds = request.params.setting
      var userServiceObject = new userService()
      userServiceObject.getProductListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/viewBestProducts', app.setting, [
    validator.check('lat').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lat'),
    validator.check('lng').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lng'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.stIds = request.params.setting
      var userServiceObject = new userService()
      userServiceObject.viewBestProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getAllAdds', function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var userControllerObject = new userController()
    userControllerObject.getAllAddsUserController(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/searchAdds', [
    validator.check('title').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Title')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.searchAddsUserController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deleteUser', [
    validator.check('id').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.deleteUserController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/homeSearch', [
    validator.check('name').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Name')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.homeSearchUserController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getMyProfile', app.auth, function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    var userControllerObject = new userController()
    userControllerObject.getMyProfileUserController(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.get(userPath + '/getMyAddresses', app.auth, function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    var userControllerObject = new userController()
    userControllerObject.getMyAddressesUserController(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/addAddresses', app.auth, [
    validator.check('addressType').isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1], Address Type'),
    validator.check('addressPinDetails').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Address Pin Details'),
    validator.check('landmark').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Landmark'),
    validator.check('instruction').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Instruction'),
    validator.check('latitude').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Latitude'),
    validator.check('longitude').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Longitude'),
    validator.check('buildingName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Building Name')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.addAddressesController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateCurrentAddress', app.auth, [
    validator.check('addressType').isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1], Address Type'),
    validator.check('addressPinDetails').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Address Pin Details'),
    validator.check('landmark').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Landmark'),
    validator.check('instruction').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Instruction'),
    validator.check('latitude').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Latitude'),
    validator.check('longitude').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Longitude'),
    validator.check('buildingName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Building Name')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userServiceObject = new userService()
      userServiceObject.updateCurrentAddressService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateAddresses', app.auth, [
    validator.check('addressId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Address ID'),
    validator.check('addressType').isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1], Address Type'),
    validator.check('addressPinDetails').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Address Pin Details'),
    validator.check('landmark').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Landmark'),
    validator.check('instruction').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Instruction'),
    validator.check('latitude').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Latitude'),
    validator.check('longitude').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Longitude'),
    validator.check('buildingName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Building Name')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.updateAddressesController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getBestProduct', function (request, response) {
    var lang = request.headers.lang
    var userControllerObject = new userController()
    userControllerObject.getBestProductController(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/deleteAddresses', app.auth, [
    validator.check('addressId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Address ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.deleteAddressesController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateProfile', app.auth, [
    validator.check('firstName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], firstName'),
    validator.check('email').trim().exists().isEmail().withMessage('INVALID: $[1], Email'),
    validator.check('lastName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], lastName'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], Mobile Number'),
    validator.check('gender').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], Gender'),
    validator.check('countryCode').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], countryCode'),
    validator.check('DOB').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], DOB')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.updateProfileUserController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateDeviceToken', app.auth, [
    validator.check('os').isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1], OS'),
    validator.check('fcmToken').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Firebase Token')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.updateDeviceTokenController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getDetailStoreView', [
    validator.check('storeId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Store ID'),
    validator.check('categoryId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Category ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.getDetailStoreViewController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getDetailProductCategoryView', [
    validator.check('storeId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Store ID'),
    validator.check('categoryId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Category ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.getDetailProductCategoryViewController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getListProductView', [
    validator.check('productCategoryId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Product Category ID'),
    validator.check('productSubCategoryId').optional().isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Product Sub Category ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userControllerObject = new userController()
      userControllerObject.getListProductViewController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/productCategorySearch', [
    validator.check('name').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Name'),
    validator.check('categoryId').isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], Category Id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.stIds = request.params.setting
      var userControllerObject = new userController()
      userControllerObject.productCategorySearchController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(result)
        })
      })
    }
  })

  app.post(userPath + '/productSearch', app.setting, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID'),
    validator.check('name').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], name'),
    validator.check('lat').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lat'),
    validator.check('lng').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lng'),
    validator.check('type').isIn(['CATEGORY', 'SUBCATEGORY']).withMessage('Invalid type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.stIds = request.params.setting
      var userControllerObject = new userController()
      userControllerObject.productSearchController(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })


  app.post(userPath + '/viewProductDetails', app.setting, [
    validator.check('productId').trim().exists().isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], productId ID'),
    validator.check('lat').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lat'),
    validator.check('lng').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lng'),
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.stIds = request.params.setting
      var userServiceObject = new userService()
      userServiceObject.viewProductDetails(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/viewRelatedProduct', app.setting,[
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userId'),
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.stIds = request.params.setting
      var productServiceObject = new productService()
      productServiceObject.viewRelatedProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/addFavouriteProduct', app.auth, [
    validator.check('productId').trim().exists().isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], productId ID'),
    validator.check('isFavourite').trim().exists().isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], isFavourite')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.addFavouriteProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Cart
  app.post(userPath + '/addCart', app.auth, [
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId'),
    // validator.check('userId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], userId'),
    validator.check('key').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], key'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('cuttingStyle').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], cuttingStyle'),
    validator.check('boxStyle').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], boxStyle')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.userAddCartService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })


  app.post(userPath + '/deleteCart', app.auth, [
    validator.check('cartId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], cartId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.deleteCartService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/viewCart', app.auth , function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    var productServiceObject = new productService()
    productServiceObject.viewCartService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/viewFavList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.viewFavListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getPaymentList', app.auth , function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    var productServiceObject = new productService()
    productServiceObject.getPaymentListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/getDeliveryTime', app.auth ,[
    validator.check('dayId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dayId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.getDeliveryTimeService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/placeOrder', app.auth, [
    validator.check('addressId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], addressId'),
    validator.check('deliveryTimeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deliveryTimeId'),
    validator.check('paymentId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], paymentId'),
    validator.check('deliveryDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deliveryDate'),
    validator.check('fastDelivery').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], fastDelivery'),
    validator.check('deleteItems').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deleteItems'),
    validator.check('isWallet').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isWallet'),
    validator.check('isPoint').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isPoint'),
    validator.check('isTrustUser').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isTrustUser'),
    validator.check('ordertax').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], ordertax')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.placeOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/checkCouponCode', app.auth, [
    validator.check('couponCode').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], couponCode')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.checkUserCouponCodeService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/reOrder', app.auth, [
    validator.check('addressId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], addressId'),
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('deliveryTimeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deliveryTimeId'),
    validator.check('paymentId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], paymentId'),
    validator.check('deliveryDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deliveryDate'),
    validator.check('fastDelivery').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], fastDelivery'),
    validator.check('deleteItems').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deleteItems'),
    validator.check('isWallet').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isWallet'),
    validator.check('isPoint').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isPoint'),
    validator.check('isTrustUser').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isTrustUser'),
    validator.check('ordertax').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], ordertax')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.reOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/userOrderList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.userOrderListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/userViewOrder', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.userViewOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

 

  app.post(userPath + '/userOrderCancelled', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('reason').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], reason')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.userOrderCancelledService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/userUpdateDeliveryDate', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('deliveryDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deliveryDate'),
    validator.check('deliveryTimeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], deliveryTimeId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.userUpdateDeliveryDateService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getUserProfile', app.auth , function (request, response) {
    var lang = request.headers.lang
    request.body.id = request.params.auth.id
    var userServiceObject = new userService()
    userServiceObject.getUserProfileService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/userSearch', [
    validator.check('type').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], type'),
    validator.check('searchText').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], searchText'),
    validator.check('lat').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lat'),
    validator.check('lng').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], lng'),
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.userSaveSearchService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/walletTransactionList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.walletTransactionList(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/addRating', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('appRating').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], appRating'),
    validator.check('driverRating').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], driverRating'),
    validator.check('productRating').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productRating'),
    validator.check('commemts').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], commemts')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.userId = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.addRatingService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/appFeedback', app.auth, [
    validator.check('apps').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], apps'),
    validator.check('commemts').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], commemts'),
    validator.check('rating').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], rating')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.userId = request.params.auth.id
      var userServiceObject = new userService()
      userServiceObject.appFeedbackService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/unavailableProduct', [
    validator.check('latitude').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], apps'),
    validator.check('longitude').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], commemts'),
    validator.check('address').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], rating'),
    validator.check('userId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], userId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.userId = request.params.auth.id
      var userServiceObject = new userService()
      userServiceObject.unavailableProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/walletHistory', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userServiceObject = new userService()
      userServiceObject.walletHistoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getUserfaq', function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var userServiceObject = new userService()
    userServiceObject.getUserfaqService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/updateUserSettings', app.auth, [
    validator.check('offersNotify').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], offersNotify'),
    validator.check('ordersNotify').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], ordersNotify'),
    validator.check('announcementNotify').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], announcementNotify'),
    validator.check('othersNotify').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], othersNotify')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userServiceObject = new userService()
      userServiceObject.updateUserSettingService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

}
