module.exports = function () {
  var categoryDao = require('../../dao/admin/category_dao')
  var productDao = require('../../dao/admin/product_dao')
  var userDao = require('../../dao/user_dao')
  var async = require('async')

  this.addCategoryService = async (request, callback) => {
    var response = {}
    try {
      var categoryObject = new categoryDao()
      var check = await categoryObject.categoryNameCheckDao(request)
      if(check.error){
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        if(check.result.length === 0){
          var save = await categoryObject.saveCategoryDao(request)
          if (save.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = false
            response.message = 'Success'
          }
        } else {
          response.error = true
          response.message = 'Duplicate Data'
        }
      }

    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getAllCategoryService = async (request, callback) => {
    var response = {}
    try {
      var categoryObject = new categoryDao()
      var save = await categoryObject.getAllCategoryDao(request)
      if (save.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
        response.data = save.result
      }
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.categoryProductService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var categoryObject = new categoryDao()
      var save = await categoryObject.categoryProductDao(request)
      if (save.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        resp.products = save.result
        response.error = false
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.addProductCategoryService = async (request, callback) => {
    var response = {}
    try {
      var categoryObject = new categoryDao()
      var save = await categoryObject.saveProductCategoryDao(request)
      if (save.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getProductCategoryService = async (request, callback) => {
    var response = {}
    try {
      var categoryObject = new categoryDao()
      var save = await categoryObject.getProductCategoryDao(request)
      if (save.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
        response.data = save.result
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getAdminProductSubCategoryService = async (request, callback) => {
    var response = {}
    try {
      var categoryObject = new categoryDao()
      var result = await categoryObject.getAdminProductSubCategoryDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
        response.productCategory = result.data
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.adminGetProductListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var categoryObject = new categoryDao()
      var productObject = new productDao()
      if (request.type == 'CATEGORY') {
        var object = { productCategoryId: request.id }
      } else {
        var object = { productSubCategoryId: request.id }
      }
      var results = await categoryObject.adminGetProductListDao(object, request.isActive, request.isBest)
      if (results.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
        callback(response)
      } else {
        var productList = results.data
        var length = productList.length
        if (length > 0) {
          async.eachOfSeries(productList, async function (item, index) {
            var userDaoObject = new userDao()
            var cuttingData = await productObject.findProductCuttingStyleDao(item.id)
            var boxData = await productObject.findProductBoxStyleDao(item.id)
            var releatedData = await productObject.findProductReletedProductDao(item.id)
            var storeProduct = await productObject.findProductstoreProductDao(item.id)

            item.productId = item.id
            var imageData =  await userDaoObject.productImagesDao(item)
            productList[index].productImage = ''
            if(imageData.result.length > 0){
              productList[index].productImage = imageData.result[0].productImage
            }

            productList[index].relatedId = ''
            productList[index].relCategory = ''
            productList[index].relProCategory = ''
            productList[index].relsubCategory = ''
            if (releatedData.data.length > 0) {
              productList[index].relatedId = releatedData.data[0].relatedId
              productList[index].relCategory = releatedData.data[0].relCategory
              productList[index].relProCategory = releatedData.data[0].relProCategory
              productList[index].relsubCategory = releatedData.data[0].relsubCategory
            }
            productList[index].images = imageData.result
            productList[index].cuttingStyle = cuttingData.data
            productList[index].boxStyle = boxData.data
            productList[index].relatedProduct = releatedData.data
            productList[index].storeProduct = storeProduct.data
            if (--length === 0) {
              resp.products = productList
              response.error = 'false'
              response.message = 'Success'
              // response.pages = total
              response.data = resp
              callback(response)
            }
          })
        } else {
          resp.products = results.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.addSubSubCategoryService = async (request, callback) => {
    var response = {}
    try {
      var categoryObject = new categoryDao()
      var save = await categoryObject.addSubSubCategoryDao(request)
      if (save.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.findSubCategoryService = async (request, callback) => {
    var response = {}
    try {
      // console.log(request)
      var categoryObject = new categoryDao()
      var category = await categoryObject.findSubCategoryDao(request)
      if (category.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        var subCate = category.result[0].isSubcate
        if (subCate == 0) {
          // Products List
          var object = { productCategoryId: request.id }
          var results = await categoryObject.adminGetProductListDao(object)
          if (results.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = false
            response.message = 'Success'
            response.isSubcate = subCate
            response.data = results.data
          }
        } else {
          // Sub Sub category
          var resultData = await categoryObject.findSubSubCategoryDao(request.id)
          if (resultData.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = false
            response.message = 'Success'
            response.isSubcate = subCate
            response.data = resultData.result
          }
        }
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.categoeyStatusChangeService = async (request, callback) => {
    var response = {}
    try {
      var categoryObject = new categoryDao()
      var table
      var object = {}
      if (request.type == 'Category') {
        table = 'category'
        object.categoryStatus = request.status
      } else if (request.type == 'ProductCategory') {
        table = 'product_category'
        object.productCategoryStatus = request.status
      } else if (request.type == 'SubCategory') {
        table = 'product_sub_category'
        object.productSubCategoryStatus = request.status
      } else if (request.type == 'Products') {
        table = 'product'
        object.productStatus = request.status
      }
      var result = await categoryObject.categoeyStatusChangeDao(table, request.id, object)
      if (result.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.searchCategoryService = async (request, callback) => {
    var response = {}
    try {
      var table
      var query
      var object = {}
      var categoryObject = new categoryDao()
      var productObject = new productDao()
      if (request.type == 'ProductCategory' && request.mainCategoryId) {
        table = 'product_category'
        query = '( productCategoryName LIKE  "%' + request.text + '%" )'
        object.categoryId = request.mainCategoryId
      } else if (request.type == 'SubSubCategory' && request.subCategoryId) {
        table = 'product_sub_category'
        query = '( productSubCategoryName LIKE  "%' + request.text + '%" )'
        object.productCategoryId = request.subCategoryId
      } else if (request.type == 'Products' && request.isSubCate == '1' & request.subSubCategoryId) {
        table = 'product'
        query = '( productName LIKE  "%' + request.text + '%" )'
        object.productSubCategoryId = request.subSubCategoryId
      } else if (request.type == 'Products' && request.isSubCate == '0' & request.subCategoryId) {
        table = 'product'
        query = '( productName LIKE  "%' + request.text + '%" )'
        object.productCategoryId = request.subCategoryId
      } else if (request.type == 'Category') {
        table = 'category'
        query = '( categoryName LIKE  "%' + request.text + '%" )'
      }
      var result = await categoryObject.searchCategoryDao(table, query, object)
      if (result.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        var resp = {}
        resp.type = request.type
        resp.data = result.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.searchProductNameService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var table
      var query
      var object = {}
      var categoryObject = new categoryDao()
      var productObject = new productDao()
      if (request.type == 'Products' && request.isSubCate == '1' & request.subSubCategoryId) {
        table = 'product'
        query = '( productName LIKE  "%' + request.text + '%" )'
        object.productSubCategoryId = request.subSubCategoryId
      } else if (request.type == 'Products' && request.isSubCate == '0' & request.subCategoryId) {
        table = 'product'
        query = '( productName LIKE  "%' + request.text + '%" )'
        object.productCategoryId = request.subCategoryId
      }
      var results = await categoryObject.searchProductNameDao(table, query, object)
      if(results.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
        callback(response)
      } else {
        var productList = results.data
        var length = productList.length
        if (length > 0) {
          async.eachOfSeries(productList, async function (item, index) {
            var userDaoObject = new userDao()
            var cuttingData = await productObject.findProductCuttingStyleDao(item.id)
            var boxData = await productObject.findProductBoxStyleDao(item.id)
            var releatedData = await productObject.findProductReletedProductDao(item.id)
            var storeProduct = await productObject.findProductstoreProductDao(item.id)

            item.productId = item.id
            var imageData =  await userDaoObject.productImagesDao(item)
            productList[index].productImage = ''
            if(imageData.result.length > 0){
              productList[index].productImage = imageData.result[0].productImage
            }

            productList[index].relatedId = ''
            productList[index].relCategory = ''
            productList[index].relProCategory = ''
            productList[index].relsubCategory = ''
            if (releatedData.data.length > 0) {
              productList[index].relatedId = releatedData.data[0].relatedId
              productList[index].relCategory = releatedData.data[0].relCategory
              productList[index].relProCategory = releatedData.data[0].relProCategory
              productList[index].relsubCategory = releatedData.data[0].relsubCategory
            }
            productList[index].images = imageData.result
            productList[index].cuttingStyle = cuttingData.data
            productList[index].boxStyle = boxData.data
            productList[index].relatedProduct = releatedData.data
            productList[index].storeProduct = storeProduct.data
            if (--length === 0) {
              resp.products = productList
              response.error = 'false'
              response.message = 'Success'
              // response.pages = total
              response.data = resp
              callback(response)
            }
          })
        } else {
          resp.products = results.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }

    } catch(e){
      response.error = true
      response.message = 'Oops'
      callback(response)
    }
  }

  this.editCategoryService = async (request, callback) => {
    try {
      var response = {}
      var categoryObject = new categoryDao()
      await categoryObject.checkEditCategoryDao(request)
        .then(result => {
          if (result.data.length === 0) {
            return categoryObject.updateCategoryDao(request)
          } else {
            return { error: true }
          }
        }).then(final => {
          if (!final.error) {
            response.error = 'false'
            response.message = 'Success'
          } else {
            response.error = 'true'
            response.message = 'Duplicate data'
          }
          callback(response)
        })
        .catch(error => {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.editProductCategoryService = async (request, callback) => {
    try {
      var response = {}
      var categoryObject = new categoryDao()
      await categoryObject.checkEditProCategoryDao(request)
        .then(result => {
          if (result.data.length === 0) {
            return categoryObject.updateProCategoryDao(request)
          } else {
            return { error: true }
          }
        }).then(final => {
          if (!final.error) {
            response.error = 'false'
            response.message = 'Success'
          } else {
            response.error = 'true'
            response.message = 'Duplicate data'
          }
          callback(response)
        })
        .catch(error => {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.editSubSubCategoryService = async (request, callback) => {
    try {
      var response = {}
      var categoryObject = new categoryDao()
      await categoryObject.checkEditSubSubCategoryDao(request)
        .then(result => {
          if (result.data.length === 0) {
            return categoryObject.updateSubSubCategoryDao(request)
          } else {
            return { error: true }
          }
        }).then(final => {
          if (!final.error) {
            response.error = 'false'
            response.message = 'Success'
          } else {
            response.error = 'true'
            response.message = 'Duplicate data'
          }
          callback(response)
        })
        .catch(error => {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.deleteCategoryService = async (request, callback) => {
    var response = {}
    try {
      var object = { id: request.id, isDelete: 1 }
      var productObject = {}
      var table
      if (request.type == 'Category') {
        table = 'category'
        productObject.categoryId = request.id
      } else if (request.type == 'ProductCategory') {
        table = 'product_category'
        productObject.productCategoryId = request.id
      } else if (request.type == 'SubSubCategory') {
        table = 'product_sub_category'
        productObject.productSubCategoryId = request.id
      } else if (request.type == 'Products') {
        table = 'product'
      }
      var categoryObject = new categoryDao()
      var deleteCate = await categoryObject.deleteCategoryDao(object, table)
      if(request.type != 'Products'){
        await categoryObject.deleteCategoryProductDao(productObject)
      }
      // var deleteProduct = await categoryObject.deleteCategoryProductDao(productObject)
      if (deleteCate.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.showActiveCategoryService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var categoryObject = new categoryDao()
      Promise.all([
        categoryObject.activeCategoryDao(request),
        categoryObject.activesubCategoryDao(request),
        categoryObject.activesubsubCategoryDao(request)
      ]).then(result => {
        // console.log(result[0])
        resp.category = result[0].data
        resp.subcategory = result[1].data
        resp.subsubCate = result[2].data
        
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
        callback(response)
      })
      .catch(error => {
        console.log(error)
        response.error = 'true'
        response.message = 'failed to retrive store details'
        callback(response)
      })
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
      callback(response)
    }
  }
}
