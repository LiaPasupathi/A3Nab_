module.exports = function (app, validator) {
  var userPath = '/admin'
  require('../utils/error.js')()
  var adminController = require('../controllers/admin_controller.js')
  var adminService = require('../services/admin_service')
  var categoryService = require('../services/admin/category_service.js')
  var userService = require('../services/user_service')
  var storeService = require('../services/admin/manageStore_service')
  var productService = require('../services/admin/product_service')
  var userAdminService = require('../services/admin/manageUser_service')
  var orderService = require('../services/admin/orders_service')
  var userproductService = require('../services/product_service')
  var storeOrders = require('../services/store_manager/order_service')
  var storeProduct = require('../services/store_manager/product_service')
  var driverService = require('../services/admin/driver_service')
  var supportService = require('../services/admin/support_service')
  var timeSlotService = require('../services/admin/timeSlot_service')
  var settingService = require('../services/admin/settings_service')
  var faqService = require('../services/admin/faq_service')
  var dashboardService = require('../services/admin/dashboard_service')
  var exportService = require('../services/admin/export_service')
  var rulesService = require('../services/admin/rules_service')

  var multer = require('multer')

  var storage = multer.diskStorage({
    destination: '/var/www/html/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })

  var upload = multer({ storage: storage })

  app.post(userPath + '/imageUpload', upload.single('uploaded_file'), function (req, res) {
    var response = {}
    if (req.file) {
      response.error = false
      response.imageURL = 'http://65.1.122.8/uploads/' + req.file.filename
      return res.send(response)
    } else {
      response.error = true
      response.message = 'Something went worng !!'
      return res.send(response)
    }
  })

  app.post(userPath + '/login', [
    validator.check('name').optional().isLength({ min: 1 }).withMessage('INVALID: $[1], Name'),
    validator.check('email').optional().isEmail().withMessage('INVALID: $[1], Email'),
    validator.check('password').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Password')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var adminControllerObject = new adminController()
      adminControllerObject.loginAdminController(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.get(userPath + '/getSettings', app.auth, function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var adminServiceObject = new adminService()
    adminServiceObject.getSettingService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/updateSettings', [
    validator.check('radius').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], radius')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var adminServiceObject = new adminService()
      adminServiceObject.updateSettingService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  // Category
  app.post(userPath + '/addCategory', app.auth, [
    validator.check('categoryName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryName'),
    validator.check('categoryImage').trim().exists().withMessage('INVALID: $[1], categoryImage'),
    validator.check('minimum').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minimum'),
    validator.check('orderProcessing').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderProcessing'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('managerPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerPrice'),
    validator.check('isComingSoon').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isComingSoon'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName'),
    validator.check('cate_processingMin').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], cate_processingMin')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.addCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/editCategory', app.auth, [
    validator.check('categoryName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryName'),
    validator.check('categoryImage').trim().exists().withMessage('INVALID: $[1], categoryImage'),
    validator.check('minimum').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minimum'),
    validator.check('orderProcessing').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderProcessing'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('managerPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerPrice'),
    validator.check('isComingSoon').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isComingSoon'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName'),
    validator.check('cate_processingMin').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], cate_processingMin'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.editCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getAllCategory', app.auth, function (request, response) {
    var error = {}
    if (request.headers.role != 'admin') {
      error.error = 'true'
      error.message = 'UNAUTHORIZED'
      return response.status(401).send(error)
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.getAllCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/categoryProduct', [
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.categoryProductService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  // Product Category
  app.post(userPath + '/addProductCategory', app.auth, [
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId'),
    validator.check('productCategoryName').trim().exists().withMessage('INVALID: $[1], productCategoryName'),
    validator.check('productCategoryImage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productCategoryImage'),
    validator.check('minimumOrderValue').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minimumOrderValue'),
    validator.check('orderProcessing').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderProcessing'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName'),
    validator.check('managerPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerPrice'),
    validator.check('isComingSoon').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isComingSoon'),
    validator.check('minOrderTime').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minOrderTime')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.addProductCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/editProductCategory', app.auth, [
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId'),
    validator.check('productCategoryName').trim().exists().withMessage('INVALID: $[1], productCategoryName'),
    validator.check('productCategoryImage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productCategoryImage'),
    validator.check('minimumOrderValue').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minimumOrderValue'),
    validator.check('orderProcessing').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderProcessing'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName'),
    validator.check('managerPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerPrice'),
    validator.check('isComingSoon').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isComingSoon'),
    validator.check('minOrderTime').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minOrderTime'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.editProductCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getProductCategory', app.auth, [
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.getProductCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/categoeyStatusChange', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type'),
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.categoeyStatusChangeService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/getProductSubCategory', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.getAdminProductSubCategoryService(request.body, function (result) {
        response.send(result)
      })
    }
  })

  app.post(userPath + '/getProductList', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID'),
    validator.check('type').isIn(['CATEGORY', 'SUBCATEGORY']).withMessage('Invalid type'),
    validator.check('isActive').trim().exists().isLength({ min: 1, max: 255 }).isIn(['active', 'inactive', 'none']).withMessage('Invalid type'),
    validator.check('isBest').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], isBest')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.adminGetProductListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/showActiveCategory', app.auth, [
    validator.check('categoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId'),
    validator.check('productCatgory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], productCatgory'),
    validator.check('isSubCate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], isSubCate'),
    validator.check('subsubCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], subsubCategory'),
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.showActiveCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/findSubCategory', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], ID')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.findSubCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  // Sub-sub category

  app.post(userPath + '/addSubSubCategory', app.auth, [
    validator.check('productCategoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productCategoryId'),
    validator.check('productSubCategoryName').trim().exists().withMessage('INVALID: $[1], productSubCategoryName'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.addSubSubCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/editSubSubCategory', app.auth, [
    validator.check('productCategoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productCategoryId'),
    validator.check('productSubCategoryName').trim().exists().withMessage('INVALID: $[1], productSubCategoryName'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productSubCategoryImage'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.editSubSubCategoryService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/searchCategory', app.auth, [
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type'),
    validator.check('text').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], text'),
    validator.check('mainCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], mainCategoryId'),
    validator.check('subCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], subCategoryId'),
    validator.check('subSubCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('subSubCategoryId is Empty'),
    validator.check('isSubCate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('isSubCate is Empty')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.searchCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/searchProductName', app.auth, [
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type'),
    validator.check('text').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], text'),
    validator.check('mainCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], mainCategoryId'),
    validator.check('subCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], subCategoryId'),
    validator.check('subSubCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('subSubCategoryId is Empty'),
    validator.check('isSubCate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('isSubCate is Empty')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var categoryServiceObject = new categoryService()
      categoryServiceObject.searchProductNameService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deleteCategory', app.auth, [
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
      var categoryServiceObject = new categoryService()
      categoryServiceObject.deleteCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Store

  app.get(userPath + '/getAllStores', app.auth, function (request, response) {
    var error = {}
    if (request.headers.role != 'admin') {
      error.error = 'true'
      error.message = 'UNAUTHORIZED'
      return response.status(401).send(error)
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.getAllStoreService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/storeList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.storeListService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/viewStoreDetails', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId'),
    validator.check('year').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], year'),
    validator.check('fromDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('fromDate is Empty'),
    validator.check('toDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('toDate is Empty')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.adminViewStoreDetailService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/uploadStoreBillingCyle', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('fromDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], fromDate'),
    validator.check('toDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], toDate'),
    validator.check('paidStatus').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], paidStatus'),
    validator.check('document').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], document')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.uploadStoreBillingCyleService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/viewStoreStock', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    // validator.check('status').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.adminviewStoreStockService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/viewStoreProducts', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId'),
    validator.check('categoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('categoryId is Empty'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('status').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], status'),
    validator.check('limit').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], limit')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.adminviewStoreProductService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/storeOrderList', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId'),
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('fromDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], fromDate'),
    validator.check('toDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], toDate'),
    validator.check('limit').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], limit')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.storOrderListService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/addNewStore', app.auth, [
    validator.check('email').trim().exists().withMessage('INVALID: $[1], email'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], mobileNumber'),
    validator.check('storeName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeName'),
    validator.check('storeImage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeImage'),
    validator.check('storeAddress').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeAddress'),
    validator.check('managerFname').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerFname'),
    validator.check('managerLname').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerLname'),
    validator.check('latitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], latitude'),
    validator.check('longitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], longitude'),
    validator.check('dueDay').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dueDay'),
    validator.check('storeRadius').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeRadius')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.addNewStoreService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/editNewStore', app.auth, [
    validator.check('email').trim().exists().withMessage('INVALID: $[1], email'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], mobileNumber'),
    validator.check('storeName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeName'),
    validator.check('storeImage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeImage'),
    validator.check('storeAddress').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeAddress'),
    validator.check('managerFname').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerFname'),
    validator.check('managerLname').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerLname'),
    validator.check('latitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], latitude'),
    validator.check('longitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], longitude'),
    validator.check('dueDay').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dueDay'),
    validator.check('storeRadius').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeRadius'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.editNewStoreService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/deleteStore', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.deleteStoreService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateStoreActive', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.updateStoreActiveService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Store Managers

  app.post(userPath + '/addStoreManager', app.auth, [
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], mobileNumber'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('firstName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], firstName'),
    validator.check('lastName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], lastName'),
    validator.check('post').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], post')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.addStoreManagerService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/editStoreManager', app.auth, [
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], mobileNumber'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('firstName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], firstName'),
    validator.check('lastName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], lastName'),
    validator.check('post').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], post'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.editStoreManagerService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deleteStoreManager', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.deleteStoreManagerService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getStoreManager', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeServiceObject = new storeService()
      storeServiceObject.getStoreManagerService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Products
  app.post(userPath + '/addProduct', app.auth, [
    validator.check('productName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productName'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName'),
    validator.check('productPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productPrice'),
    validator.check('productDiscount').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productDiscount'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('qty').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], qty'),
    validator.check('maxQty').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], maxQty'),
    // validator.check('productDescription').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productDescription'),
    // validator.check('orderVariants').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderVariants'),
    validator.check('instructionsStatus').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], instructionsStatus'),
    validator.check('managerPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerPrice'),
    validator.check('isComingSoon').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isComingSoon'),
    // validator.check('differentPriceVariant').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], differentPriceVariant'),
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId'),
    validator.check('productCategoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productCategoryId'),
    validator.check('productSubCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], productSubCategoryId'),
    validator.check('cuttingStyle').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], cuttingStyle'),
    validator.check('boxStyle').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], boxStyle'),
    validator.check('relatedProducts').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], relatedProducts'),
    validator.check('relCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], relCategory'),
    validator.check('relProCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], relProCategory'),
    validator.check('relsubCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('email is relsubCategory')
    // validator.check('relsubCategory').optional().isLength({ min: 1 }).withMessage('INVALID: $[1], relsubCategory')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.addProductService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/editProduct', app.auth, [
    validator.check('productName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productName'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName'),
    validator.check('productPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productPrice'),
    validator.check('productDiscount').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productDiscount'),
    validator.check('storeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('qty').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], qty'),
    validator.check('maxQty').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], maxQty'),
    // validator.check('instructionsStatus').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], instructionsStatus'),
    validator.check('managerPrice').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], managerPrice'),
    validator.check('isComingSoon').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isComingSoon'),
    // validator.check('productDescription').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productDescription'),
    // validator.check('orderVariants').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderVariants'),
    validator.check('instructionsStatus').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], instructionsStatus'),
    // validator.check('differentPriceVariant').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], differentPriceVariant'),
    validator.check('categoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryId'),
    validator.check('productCategoryId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productCategoryId'),
    validator.check('productSubCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], productSubCategoryId'),
    validator.check('cuttingStyle').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], cuttingStyle'),
    validator.check('boxStyle').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], boxStyle'),
    validator.check('relatedProducts').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], relatedProducts'),
    validator.check('relCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], Name'),
    validator.check('relProCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], Name'),
    validator.check('relsubCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('email is Empty'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.editProductProductService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/adminStarProduct', app.auth, [
    validator.check('star').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], star'),
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], productId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.adminStarProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deleteProductOptions', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], storeId'),
    validator.check('type').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var productServiceObject = new productService()
      productServiceObject.deleteProductOptionService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/adminProducts', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('category').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], category'),
    validator.check('productCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], productCategory'),
    validator.check('subSubCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], subSubCategory'),
    validator.check('productId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], productId'),
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
      var productServiceObject = new productService()
      request.body.searchType = false
      productServiceObject.adminProductListService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/adminProductFilter', app.auth, [
    // validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('category').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], category'),
    validator.check('productCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], productCategory'),
    validator.check('subSubCategory').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], subSubCategory'),
    validator.check('productId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], productId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      request.body.searchType = true
      var productServiceObject = new productService()
      productServiceObject.adminProductListService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  // Users
  app.post(userPath + '/userList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('limit').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], limit'),
    validator.check('signupDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], signupDate'),
    validator.check('text').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], text')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userAdminServiceObject = new userAdminService()
      userAdminServiceObject.userListService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/viewUser', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userAdminServiceObject = new userAdminService()
      userAdminServiceObject.viewUserService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  // Orders
  app.post(userPath + '/orderList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('orderStatus').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], orderStatus'),
    validator.check('storeStatus').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeStatus'),
    validator.check('deliveryTime').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], deliveryTime'),
    validator.check('orderDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], orderDate')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.orderListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/calcelledOrder', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.calcelledOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getDeliveryTime', app.auth, function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var productServiceObject = new userproductService()
    productServiceObject.getDeliveryTimeService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/orderListStoreStatus', app.auth, [
    validator.check('orderStatus').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], orderStatus'),
    validator.check('storeStatus').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeStatus'),
    validator.check('deliveryTime').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], deliveryTime')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.orderListStoreStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/viewOrderDetails', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], orderId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.viewOrderDetailService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/adminDeleteItems', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], orderId'),
    validator.check('productId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], productId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.adminDeleteItemService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/adminAddVendor', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId'),
    validator.check('vendorName').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], vendorName')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeOrderObject = new storeOrders()
      storeOrderObject.addStoreVendorService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/storeVendorList', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeOrderObject = new storeOrders()
      storeOrderObject.getStoreVendorListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/adminUpdateStoreStock', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId'),
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
      var storeProductObject = new storeProduct()
      storeProductObject.updateStoreStockService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/adminViewStockHistory', app.auth, [
    validator.check('storeId').trim().exists().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], storeId'),
    validator.check('productId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], vendorName')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var storeProductObject = new storeProduct()
      storeProductObject.viewStockHistoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/trustUserActive', app.auth, [
    validator.check('trustUser').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], trustUser'),
    validator.check('packageValue').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], packageValue'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userAdminServiceObject = new userAdminService()
      userAdminServiceObject.trustUserActiveService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  app.post(userPath + '/updateUserActive', app.auth, [
    validator.check('userStatus').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], userStatus'),
    // validator.check('packageValue').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], packageValue'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var userAdminServiceObject = new userAdminService()
      userAdminServiceObject.updateUserActiveService(request.body, function (message) {
        return response.send(message)
      })
    }
  })

  // Driver

  app.post(userPath + '/addDriver', app.auth, [
    validator.check('firstName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], firstName'),
    validator.check('profilePic').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], profilePic'),
    validator.check('lastName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], lastName'),
    validator.check('email').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], email'),
    validator.check('countryCode').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], countryCode'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], mobileNumber'),
    validator.check('gender').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], gender'),
    validator.check('dob').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dob'),
    validator.check('IDNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], IDNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.addNewDriverService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/editDriver', app.auth, [
    validator.check('firstName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], firstName'),
    validator.check('profilePic').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], profilePic'),
    validator.check('lastName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], lastName'),
    validator.check('email').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], email'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], mobileNumber'),
    validator.check('gender').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], gender'),
    validator.check('dob').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dob'),
    validator.check('IDNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], IDNumber'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.editDriverService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateDriverActive', app.auth, [
    validator.check('driverActive').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], driverActive'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.updateDriverActiveService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getDriverList', app.auth, [
    validator.check('driverActive').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], driverActive'),
    validator.check('isComplete').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], isComplete')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.getDriverListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateFloatingCash', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('amount').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], amount')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.updateFloatingCashService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // app.get(userPath + '/getDriverFloatingCash', app.auth, function (request, response) {
  //   var lang = request.headers.lang
  //   // request.body.id = request.params.auth.id
  //   var driverServiceObject = new driverService()
  //   driverServiceObject.getDriverFloatingCashService(request.body, function (result) {
  //     this.ctrlHandler([result], result.error, lang, (message) => {
  //       return response.send(message)
  //     })
  //   })
  // })

  app.post(userPath + '/addCar', app.auth, [
    validator.check('licenseNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], licenseNumber'),
    validator.check('carImage').optional({ checkFalsy: true }).isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], carImage'),
    validator.check('expirationDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], expirationDate'),
    validator.check('carModel').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], carModel'),
    validator.check('startingMileage').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], castartingMileagerModel')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.addNewCarService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getCarList', app.auth, function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var driverServiceObject = new driverService()
    driverServiceObject.getCarListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/getAllCarList', app.auth, [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.getCarListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/viewCarrDetails', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.viewCarDetailService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/assignDriver', app.auth, [
    validator.check('carId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], carId'),
    validator.check('driverId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], driverId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var driverServiceObject = new driverService()
      driverServiceObject.assignDriverService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/assignDriverList', app.auth, function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var driverServiceObject = new driverService()
    driverServiceObject.assignDriverListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.get(userPath + '/unAssignOrderList', app.auth, function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var orderServiceObject = new orderService()
    orderServiceObject.unAssignOrderListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/findDriverAssignOrder', app.auth, [
    validator.check('latitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], latitude'),
    validator.check('longitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], longitude'),
    validator.check('driverId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], driverId'),
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.findDriverAssignOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/assignOrder', app.auth, [
    validator.check('latitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], latitude'),
    validator.check('longitude').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], longitude'),
    validator.check('driverId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], driverId'),
    validator.check('route').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], route'),
    validator.check('pickup').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pickup'),
    validator.check('drop').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], drop')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.adminassignOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/addAssignOrder', app.auth, [
    validator.check('routeId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], routeId'),
    validator.check('route').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], route')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.addAssignOrderOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Offers
  app.post(userPath + '/getAssignmentList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.adminGetAssignmentListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Offers
  app.post(userPath + '/getOfferList', app.auth, [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.adminOfferListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/addNewOffers', app.auth, [
    validator.check('title').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], title'),
    validator.check('couponCode').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], couponCode'),
    validator.check('image').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], image'),
    validator.check('trustUser').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], trustUser'),
    validator.check('description').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], description'),
    validator.check('discount').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], discount'),
    validator.check('minimumValue').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minimumValue'),
    validator.check('count').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], count'),
    validator.check('startDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], startDate'),
    validator.check('endDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], endDate'),
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status'),
    validator.check('offCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], offCategoryId'),
    validator.check('offProductId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], offProductId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.addNewOfferService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/editOffers', app.auth, [
    validator.check('title').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], title'),
    validator.check('couponCode').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], couponCode'),
    validator.check('image').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], image'),
    validator.check('trustUser').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], trustUser'),
    validator.check('description').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], description'),
    validator.check('discount').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], discount'),
    validator.check('minimumValue').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], minimumValue'),
    validator.check('count').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], count'),
    validator.check('startDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], startDate'),
    validator.check('endDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], endDate'),
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status'),
    validator.check('offCategoryId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], offCategoryId'),
    validator.check('offProductId').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], offProductId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var orderServiceObject = new orderService()
      orderServiceObject.editOfferService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateOfferStatus', app.auth, [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status'),
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
      var orderServiceObject = new orderService()
      orderServiceObject.adminupdateOfferStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Support
  app.post(userPath + '/searchOrderId', app.auth, [
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.searchOrderIdService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/addSupport', app.auth, [
    validator.check('userId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('orderId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('notes').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], notes')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.addSupportService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateSupportStatus', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId'),
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orderId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.updateSupportStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getSupportList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.getSupportListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getAppFeedbackList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.getAppFeedbackListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getUserFeedbackList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.getUserFeedbackListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getDriverFeedbackList', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.getDriverFeedbackListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getunavailableProduct', app.auth, [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var supportServiceObject = new supportService()
      supportServiceObject.getunavailableProductService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getTimeSlot', app.auth, function (request, response) {
    var lang = request.headers.lang
    var timeSlotServiceObject = new timeSlotService()
    timeSlotServiceObject.getTimeSlotService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/addTimeSlot', app.auth, [
    validator.check('fromTime').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], fromTime'),
    validator.check('toTime').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], toTime'),
    validator.check('maxOrder').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], maxOrder'),
    validator.check('dayId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dayId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var timeSlotServiceObject = new timeSlotService()
      timeSlotServiceObject.addTimeSlotService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/editTimeSlot', app.auth, [
    validator.check('fromTime').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], fromTime'),
    validator.check('toTime').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], toTime'),
    validator.check('maxOrder').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], maxOrder'),
    validator.check('dayId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dayId'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var timeSlotServiceObject = new timeSlotService()
      timeSlotServiceObject.editTimeSlotService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deleteTimeSlot', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('dayId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dayId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var timeSlotServiceObject = new timeSlotService()
      timeSlotServiceObject.deleteTimeSlotService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Notification
  app.get(userPath + '/getNotificationList', app.auth, function (request, response) {
    var lang = request.headers.lang
    var settingServiceObject = new settingService()
    settingServiceObject.getNotificationListSettingService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/updateNotificationStatus', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('type').isIn(['Customer', 'Manager', 'Delivery']).withMessage('Invalid type'),
    validator.check('sendType').isIn(['email', 'sms', 'push']).withMessage('INVALID: $[1], sendType'),
    validator.check('status').isIn(['true', 'false']).isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var settingServiceObject = new settingService()
      settingServiceObject.updateNotificationStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateNotificationTitle', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('type').isIn(['Customer', 'Manager', 'Delivery']).withMessage('Invalid type'),
    validator.check('title').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], title'),
    validator.check('description').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], description'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var settingServiceObject = new settingService()
      settingServiceObject.updateNotificationTitleService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })


  app.post(userPath + '/updateSocialLinks', app.auth, [
    validator.check('instagramURL').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], instagramURL'),
    validator.check('facebookURL').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], facebookURL'),
    validator.check('linkedURL').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], linkedURL'),
    validator.check('twitterURL').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], twitterURL')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var settingServiceObject = new settingService()
      settingServiceObject.updateSocialLinkService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getAppSettings', app.auth, function (request, response) {
    var lang = request.headers.lang
    var settingServiceObject = new settingService()
    settingServiceObject.getAppSettingService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  // FAQ Category
  app.post(userPath + '/addfaqCategory', [
    validator.check('categoryName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryName'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.userId = request.params.auth.id
      var faqServiceObj = new faqService()
      faqServiceObj.addfaqCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/editfaqCategory', [
    validator.check('categoryName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], categoryName'),
    validator.check('arabicName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicName'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var faqServiceObj = new faqService()
      faqServiceObj.editfaqCategoryService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getfaqCategory', app.auth, function (request, response) {
    var lang = request.headers.lang
    var faqServiceObj = new faqService()
    faqServiceObj.getfaqCategoryService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/faqCategoryStatus', [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var faqServiceObj = new faqService()
      faqServiceObj.updatefaqCategoryStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deletefaqCategory', [
    validator.check('isDelete').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isDelete'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var faqServiceObj = new faqService()
      faqServiceObj.updatefaqCategoryStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // FAQ
  app.post(userPath + '/addfaq', [
    validator.check('question').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], question'),
    validator.check('answer').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], answer'),
    validator.check('arabicQuestion').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicQuestion'),
    validator.check('arabicAnswer').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicAnswer'),
    validator.check('faqCategory').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], faqCategory'),
    validator.check('type').isIn(['CUSTOMER', 'MANAGER']).withMessage('Invalid type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var faqServiceObj = new faqService()
      faqServiceObj.addfaqServices(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/editfaq', [
    validator.check('question').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], question'),
    validator.check('answer').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], answer'),
    validator.check('arabicQuestion').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicQuestion'),
    validator.check('arabicAnswer').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], arabicAnswer'),
    validator.check('faqCategory').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], faqCategory'),
    validator.check('type').isIn(['CUSTOMER', 'MANAGER']).withMessage('Invalid type'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.userId = request.params.auth.id
      var faqServiceObj = new faqService()
      faqServiceObj.editfaqServices(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/getfaq', [
    validator.check('type').isIn(['CUSTOMER', 'MANAGER']).withMessage('Invalid type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var faqServiceObj = new faqService()
      faqServiceObj.getfaqServices(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deletefaq', [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var faqServiceObj = new faqService()
      faqServiceObj.delfaqService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/addPolicyNcondition', [
    validator.check('text').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], text'),
    validator.check('type').isIn(['POLICY', 'CONDITION']).withMessage('Invalid type')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      // request.body.userId = request.params.auth.id
      var faqServiceObj = new faqService()
      faqServiceObj.addPolicyNconditionService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.get(userPath + '/getPolicyNcondition', app.auth, function (request, response) {
    var lang = request.headers.lang
    var faqServiceObj = new faqService()
    faqServiceObj.getPolicyNconditionService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  // Dashboard
  app.post(userPath + '/dashboard', app.auth,[
    validator.check('year').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], year'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
    var dashboardServiceObj = new dashboardService()
    dashboardServiceObj.dashboardService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
    }
  })

  app.post(userPath + '/dashboardOrder', [
    validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var dashboardServiceObj = new dashboardService()
      dashboardServiceObj.dashboardOrderService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/topStats', [
    // validator.check('pageNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], pageNumber'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var dashboardServiceObj = new dashboardService()
      dashboardServiceObj.topStatsService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/heatMap', [
    validator.check('fromDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('fromDate is Empty'),
    validator.check('toDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('toDate is Empty')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var dashboardServiceObj = new dashboardService()
      dashboardServiceObj.heatMapService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/topSellingItems', [
    validator.check('fromDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('fromDate is Empty'),
    validator.check('toDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('toDate is Empty')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var dashboardServiceObj = new dashboardService()
      dashboardServiceObj.topSellingItemService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Export
  app.post(userPath + '/exportData', [
    validator.check('users').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], users'),
    validator.check('store').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], store'),
    validator.check('driver').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], driver'),
    validator.check('cars').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], cars'),
    validator.check('product').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], product'),
    validator.check('vendor').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], vendor'),
    validator.check('support').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], support'),
    validator.check('orders').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], orders'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var exportDataServiceObj = new exportService()
      exportDataServiceObj.exportDataServiceList(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Rules
  app.post(userPath + '/addNewRule', [
    validator.check('title').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], title'),
    validator.check('triggerName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], triggerName'),
    validator.check('startDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], startDate'),
    validator.check('endDate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], startDate'),
    validator.check('options').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], options')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var rulesServiceObject = new rulesService()
      rulesServiceObject.newRulesService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/rulesList', [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var rulesServiceObject = new rulesService()
      rulesServiceObject.rulesListService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/ruleStatus', [
    validator.check('status').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], status'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var rulesServiceObject = new rulesService()
      rulesServiceObject.changeRuleStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deleteRules', [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('isDelete').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isDelete')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var rulesServiceObject = new rulesService()
      rulesServiceObject.changeRuleStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  // Sub admin
  app.post(userPath + '/addSubAdmin', app.auth, [
    validator.check('firstName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], firstName'),
    validator.check('lastName').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], lastName'),
    validator.check('email').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], email'),
    validator.check('password').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], password'),
    validator.check('mobileNumber').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], mobileNumber'),
    // validator.check('account').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], account'),
    // validator.check('level1').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], level1'),
    // validator.check('level2').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], level2'),
    // validator.check('level3').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], level3'),
    validator.check('roleId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], roleId'),
    validator.check('dob').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], dob')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var adminServiceObject = new adminService()
      adminServiceObject.addSubAdminService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  

  app.get(userPath + '/getAdminRoles', app.auth, function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var adminServiceObject = new adminService()
    adminServiceObject.getAdminRolesListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.get(userPath + '/getSubadmin', app.auth, function (request, response) {
    var lang = request.headers.lang
    // request.body.id = request.params.auth.id
    var adminServiceObject = new adminService()
    adminServiceObject.getSubadminListService(request.body, function (result) {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  app.post(userPath + '/roleByPermission', app.auth, [
    validator.check('roleId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], roleId')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var adminServiceObject = new adminService()
      adminServiceObject.roleByPermissionService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updatePermission', app.auth, [
    validator.check('roleId').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], roleId'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('writeOpt').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], writeOpt'),
    validator.check('readOpt').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], readOpt'),
    validator.check('exportOpt').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], exportOpt'),
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var adminServiceObject = new adminService()
      adminServiceObject.updatePermissionService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })


  app.post(userPath + '/changeAdminStatus', app.auth, [
    validator.check('account').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], account'),
    validator.check('level1').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], level1'),
    validator.check('level2').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], level2'),
    validator.check('level3').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], level3'),
    validator.check('superAdmin').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], superAdmin'),
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var adminServiceObject = new adminService()
      adminServiceObject.changeAdminStatusService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/deleteAdmin', app.auth, [
    validator.check('id').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], id'),
    validator.check('isDelete').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], isDelete')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var adminServiceObject = new adminService()
      adminServiceObject.deleteAdminService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateOrderSettings', app.auth, [
    validator.check('minimumOrderValue').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], minimumOrderValue'),
    validator.check('quickDelivery').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], quickDelivery'),
    validator.check('walletAmount').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], walletAmount'),
    validator.check('expiryDate').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], expiryDate'),
    validator.check('taxAmount').optional({ checkFalsy: true }).isLength({ min: 1 }).withMessage('INVALID: $[1], taxAmount')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var settingServiceObject = new settingService()
      settingServiceObject.updateOrderSrttingService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/updateWalletSetting', app.auth, [
    validator.check('walletSAR').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], walletSAR'),
    validator.check('walletPoints').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], walletPoints')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var settingServiceObject = new settingService()
      settingServiceObject.updateWalletSettingService(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  app.post(userPath + '/distanceRate', app.auth, [
    validator.check('flatRate').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], flatRate'),
    validator.check('perKM').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], perKM'),
    validator.check('QuickDeliveryPerKM').trim().exists().isLength({ min: 1 }).withMessage('INVALID: $[1], QuickDeliveryPerKM')
  ], function (request, response) {
    var lang = request.headers.lang
    var error = validator.validation(request)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message)
      })
    } else {
      var settingServiceObject = new settingService()
      settingServiceObject.distanceRateServive(request.body, function (result) {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

}
