module.exports = function (app, validator) {
  var userPath = '/driver'
  require('../utils/error.js')()

  var driverService = require('../services/driver/driver_service')

  app.post(userPath + '/login', [
    // validator.check('countryCode').trim().exists().isLength({ min: 1, max: 4 }).withMessage('INVALID: $[1], Country Code'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 7, max: 18 }).withMessage('INVALID: $[1], Mobile Number')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.logindriverService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getProfile', app.auth, function (request, response) {
    var lang = request.headers.lang
    var driverServiceObject = new driverService()
    request.body.id = request.params.auth.id
    driverServiceObject.driverProfileService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/updateDeviceToken', app.auth, [
    validator.check('fcmToken').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], fcmToken')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.driverupdateDeviceToken(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/dashboard', app.auth, function (request, response) {
    var lang = request.headers.lang
    var driverServiceObject = new driverService()
    request.body.id = request.params.auth.id
    request.body.carId = request.params.auth.carId
    driverServiceObject.driverDashboardService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/updateProfile', app.auth, [
    validator.check('firstName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], firstName'),
    validator.check('lastName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], lastName'),
    validator.check('email').isEmail().withMessage('INVALID: $[1], Email'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 7, max: 18 }).withMessage('INVALID: $[1], Mobile Number'),
    validator.check('gender').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], Gender'),
    validator.check('dob').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], DOB')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.updateDriverProfileService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateDriverStatus', app.auth, [
    validator.check('isDeleteDriver').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.updateDriverStatuService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/acceptCar', app.auth, [
    validator.check('isAccepted').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isAccepted')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      // console.log(request.body)
      driverServiceObject.acceptCarService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/uploadDocument', app.auth, [
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type'),
    validator.check('document').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], document')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.uploadDocumentDriverService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updatelatlng', app.auth, [
    validator.check('latitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], latitude'),
    validator.check('longitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], longitude')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.updatelatlngService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/maintenanceList', app.auth, function (request, response) {
    var lang = request.headers.lang
    var driverServiceObject = new driverService()
    request.body.id = request.params.auth.id
    driverServiceObject.maintenanceListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/addMaintenance', app.auth, [
    validator.check('carId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], cardId'),
    validator.check('maintenanceId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], maintenanceId'),
    validator.check('maintenanceAmount').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], maintenanceAmount'),
    validator.check('currentMileage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], currentMileage'),
    validator.check('message').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], message Code')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.addMaintenanceService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/returnCar', app.auth, [
    validator.check('carId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], carId'),
    validator.check('damages').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], damages'),
    validator.check('carMileage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], carMileage')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    // request.body.carId = request.params.auth.carId
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.returnCarService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getRoute', app.auth, [
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId'),
    // validator.check('damages').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], damages'),
    // validator.check('carMileage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], carMileage')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    // request.body.carId = request.params.auth.carId
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.orderDeliveryRoute(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/viewRoute', app.auth, [
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId'),
    // validator.check('damages').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], damages'),
    // validator.check('carMileage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], carMileage')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    request.body.id = request.params.auth.id
    // request.body.carId = request.params.auth.carId
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.vieworderDeliveryRoute(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateOrderStatus', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    // request.body.carId = request.params.auth.carId
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.driverupdateOrderStatuService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateReceipt', app.auth, [
    validator.check('u_id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('receipt').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], receipt')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    // request.body.carId = request.params.auth.carId
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.driverupdateReceiptService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/moveToLast', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    // request.body.carId = request.params.auth.carId
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.driverMoveToLastService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getAssignment', app.auth, function (request, response) {
    var lang = request.headers.lang
    var driverServiceObject = new driverService()
    request.body.id = request.params.auth.id
    driverServiceObject.getAssignmentListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/viewOrderDetails', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    // request.body.id = request.params.auth.id
    // request.body.carId = request.params.auth.carId
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.driverViewOrderDetailsService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/makeDelivery', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId'),
    validator.check('userId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], userId'),
    validator.check('notes').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], notes'),
    validator.check('findLocation').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], findLocation')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      var driverServiceObject = new driverService()
      driverServiceObject.makeDeliveryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/finalDeliveryCall', app.auth, [
    // validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId'),
    // validator.check('userId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], userId'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.finalDeliveryCallService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/driverNotification', app.auth, [
    // validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    // validator.check('userId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], userId'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.id = request.params.auth.id
      var driverServiceObject = new driverService()
      driverServiceObject.driverNotificationService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

}
