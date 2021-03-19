module.exports = function () {
  var async = require('async')
  var userDao = require('../../dao/user_dao')
  var storeProducts = require('../../dao/store_manager/storeProduct_dao')
  var productDao = require('../../dao/products_dao')
  var managerStore = require('../../dao/admin/manageStore_dao')
  require('../../utils/common.js')()
  require('../../utils/error.js')()

  this.homeDashboardUserService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      Promise.all([
        userDaoObject.getOfferDetailsDao(request),
        userDaoObject.getUserCategoryDao(request),
        this.storeBestProductService(request)
      ])
        .then(result => {
          resp.bannerImages = result[0].data
          resp.category = result[1].data
          resp.bestProducts = result[2].data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        })
        .catch(error => {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.storeBestProductService = function (data) {
    return new Promise(async function (resolve, reject) {
      var response = {}
      var response = {}
      var userDaoObject = new userDao()
      var storeProductsObject = new storeProducts()
      var offers = await storeProductsObject.bestProductsDao(data)
      if (offers.errr) {
        response.error = true
        reject(response)
      } else {
        if (offers.data.length > 0) {
          var products = offers.data
          var length = products.length
          async.eachOfSeries(products, async function (item, index) {
            var req = {
              productId: item.id
            }
            var productImagesDao = await userDaoObject.productImagesDao(req)
            products[index].productImages = productImagesDao.result
            if (--length === 0) {
              response.error = false
              response.data = products
              resolve(response)
            }
          })
        } else {
          response.error = false
          response.data = offers.data
          resolve(response)
        }
      }
    })
  }

  this.getProductCategoryService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      Promise.all([
        userDaoObject.getProductUserCategoryDao(request),
        this.storeBestProductService(request)
      ])
        .then(result => {
          console.log(result)
          resp.productCategory = result[0].data
          resp.bestProducts = result[1].data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        })
        .catch(error => {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.getProductListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var storeProductsObject = new storeProducts()
      var bestProducts = await this.storeBestProductService(request)
      if (request.type == 'CATEGORY') {
        var object = { categoryId: request.id }
      } else {
        var object = { productSubCategoryId: request.id }
      }
      request.queryType = 'TOTAL'

      var totalResult = await storeProductsObject.getProductListtDao(request, object)
      if (totalResult.error || bestProducts.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (totalResult.data.length > 0) {
          request.pageCount = 10
          request.queryType = 'LIST'

          var total = totalResult.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
          request.queryType = 'LIST'
          var result = await storeProductsObject.getProductListtDao(request, object)
          if (result.error) {
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            var products = result.data
            var length = products.length
            if (length > 0) {
              async.eachOfSeries(products, async function (item, index) {
                var req = {
                  productId: item.id
                }
                var productImagesDao = await userDaoObject.productImagesDao(req)
                products[index].productImages = productImagesDao.result
                if (--length === 0) {
                  resp.pages = total
                  resp.products = products
                  resp.bestProducts = bestProducts.data

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.pages = total
              resp.products = result.data
              resp.bestProducts = bestProducts.data

              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.pages = 0
          resp.products = totalResult.data
          resp.bestProducts = bestProducts.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.getproductOutOfStockService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var storeProductsObject = new storeProducts()
      request.queryType = 'TOTAL'
      var totalResult = await storeProductsObject.getproductOutOfStockDao(request)
      if (totalResult.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (totalResult.data.length > 0) {
          request.pageCount = 10
          

          var total = totalResult.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
          request.queryType = 'LIST'
          console.log(request)
          var result = await storeProductsObject.getproductOutOfStockDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            var products = result.data
            var length = products.length
            if (length > 0) {
              async.eachOfSeries(products, async function (item, index) {
                var req = {
                  productId: item.id
                }
                var productImagesDao = await userDaoObject.productImagesDao(req)
                products[index].productImages = productImagesDao.result
                if (--length === 0) {
                  resp.pages = total
                  resp.products = products
                  // resp.bestProducts = bestProducts.data

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.pages = total
              resp.products = result.data
              // resp.bestProducts = bestProducts.data

              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.pages = 0
          resp.products = totalResult.data
          // resp.bestProducts = bestProducts.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.viewProductDetails = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()

      var viewProduct = await productDaoObject.viewProductDao(request)
      var imageResult = await userDaoObject.productImagesDao(request)
      var relatedResult = await this.userRelatedProductService(request)

      if (viewProduct.error || imageResult.error == 'true' || relatedResult.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        if(viewProduct.data.length > 0){
          var productDetails = viewProduct.data[0]
          productDetails.productImages = imageResult.result

          var bestProduct = await this.storeBestProductService(request)
          if (bestProduct.error) {
            response.error = 'true'
            response.message = 'fetch failed'
          } else {
            resp.productDetails = productDetails
            resp.relatedProducts = relatedResult.data
            resp.bestProducts = bestProduct.data
  
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
        } else {
          response.error = 'true'
        response.message = 'Invalid Product ID'
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }
  this.userRelatedProductService = function (request) {
    return new Promise(async function (resolve) {
      var response = {}

      var productDaoObject = new productDao()
      var userDaoObject = new userDao()
      var productResult = await productDaoObject.getRelatedProductsDao(request)

      if (productResult.error) {
        response.error = true
      } else {
        var products = productResult.data
        var length = products.length
        if (length > 0) {
          async.eachOfSeries(products, async function (item, index) {
            var req = {
              productId: item.id
            }
            
            var productImagesDao = await userDaoObject.productImagesDao(req)
            // var produdctVariant = await productDaoObject.getProdudctVariantDao(req)
            // products[index].variants = produdctVariant.data
            products[index].productImages = productImagesDao.result
            if (--length === 0) {
              response.error = false
              response.message = 'Success'
              response.data = products
              resolve(response)
            }
          })
        } else {
          response.error = false
          response.message = 'Success'
          response.data = []
          resolve(response)
        }
      }
    })
  }

  this.productSearchService = async (userData, callback) => {
    try {
      var response = {}
      var resp = {}
      if (userData.type == 'CATEGORY') {
        var object = { categoryId: userData.id }
      } else {
        var object = { productSubCategoryId: userData.id }
      }
      var userDaoObject = new userDao()
      var storeProductsObject = new storeProducts()
      var productSearch = await storeProductsObject.productSearchDao(object, userData)
      if (productSearch.error === 'false') {
        var productListLength = productSearch.result.length
        if (productListLength > 0) {
          productSearch.result.forEach(async function (data, index) {
            var req = {
              productId: data.id
            }
            var productImagesDao = await userDaoObject.productImagesDao(req)
            productSearch.result[index].productImages = productImagesDao.result
            if (--productListLength == 0) {
              resp.productList = productSearch.result
              response.error = 'false'
              response.message = 'store details retrived successfully'
              response.data = resp
              callback(response)
            }
          })
        } else {
          resp.productList = productSearch.result
          response.error = 'false'
          response.message = 'store details retrived successfully'
          response.data = resp
          callback(response)
        }
      } else {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.viewBestProductService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var userDaoObject = new userDao()
      var storeProductsObject = new storeProducts()
      request.queryType = 'TOTAL'
      var totalResult = await storeProductsObject.getUserBestProductDao(request)
      if (totalResult.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (totalResult.data.length > 0) {
          request.pageCount = 10
          request.queryType = 'LIST'

          var total = totalResult.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
          request.queryType = 'LIST'
          var result = await storeProductsObject.getUserBestProductDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            var products = result.data
            var length = products.length
            if (length > 0) {
              async.eachOfSeries(products, async function (item, index) {
                var req = {
                  productId: item.id
                }
                var productImagesDao = await userDaoObject.productImagesDao(req)

                products[index].productImages = productImagesDao.result
                if (--length === 0) {
                  resp.pages = total
                  resp.products = products

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.pages = total
              resp.products = result.data

              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.pages = 0
          resp.products = totalResult.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.updateStockService = async (request, callback) => {
    try {
      var response = {}
      var storeProductsObject = new storeProducts()
      // console.log(request)
      var result = await storeProductsObject.updateStockCountPriceService(request)
      if(result.error){
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.updateStoreStockService = async (request, callback) => {
    try {
      var response = {}
      // console.log(request)
      // return;
      var storeProductsObject = new storeProducts()
      if(request.stockType === 'ADD'){
        var updateCount = parseInt(request.currentStock) + parseInt(request.units)
      } else {
        var updateCount = parseInt(request.currentStock) - parseInt(request.units)
      }
      var updateStore = { storeId: request.storeId, productId: request.productId, storeStock: updateCount }
      var result = await storeProductsObject.updateStockCountService(updateStore)
      if(result.error){
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        var vendorObject = {}
        vendorObject.productId = request.productId
        vendorObject.vendorId = request.vendorId
        vendorObject.storeId = request.storeId
        vendorObject.units = request.units
        vendorObject.stockType = request.stockType
        vendorObject.managerId = request.id
        if(request.expiryDate){
          vendorObject.expiryDate = request.expiryDate
        }
        if(request.StockReason){
          vendorObject.StockReason = request.StockReason
        }
      }
      var result = await storeProductsObject.addVendorProductDao(vendorObject)
      if(result.error){
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.viewStockHistoryService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var storeProductsObject = new storeProducts()
      var productStock = await storeProductsObject.viewStockHistoryDao(request)
      if(productStock.error){
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        resp.product = productStock.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.changeStoreProductService = async (request, callback) => {
    try {
      var response = {}
      var storeProductsObject = new storeProducts()
      var productStock = await storeProductsObject.updateStoreProductStatusDao(request)
      if(productStock.error){
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.changeStoreCategoryProductService = async (request, callback) => {
    try {
      var response = {}
      var storeProductsObject = new storeProducts()
      var productStock = await storeProductsObject.changeStoreCategoryProductDao(request)
      if(productStock.error){
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.searchNewProductService = async (request, callback) => {
    try {
      var response = {}
      var managerStoreObject = new managerStore()
      var storeProductsObject = new storeProducts()
      var userDaoObject = new userDao()
      var resp = {}
      if (request.type == 'CATEGORY') {
        var object = { categoryId: request.id }
      } else {
        var object = { productSubCategoryId: request.id }
      }
      var getMyProducts = await managerStoreObject.storProductListDao(request)
      if(getMyProducts.error){
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        var ids = []
        if(getMyProducts.data.length > 0){
          getMyProducts.data.map(item => {
            ids.push(item.productId)
          })
          }
          request.ids = ids
          var result = await storeProductsObject.getSearchNewProductListtDao(request, object)
              if (result.error) {
                response.error = 'true'
                response.message = 'fetch failed'
                callback(response)
              } else {
                var products = result.data
                var length = products.length
                if (length > 0) {
                  async.eachOfSeries(products, async function (item, index) {
                    var req = {
                      productId: item.id
                    }
                    var productImagesDao = await userDaoObject.productImagesDao(req)
                    products[index].productImages = productImagesDao.result
                    if (--length === 0) {
                      // resp.pages = total
                      resp.products = products
                      // resp.bestProducts = bestProducts.data
    
                      response.error = 'false'
                      response.message = 'Success'
                      response.data = resp
                      callback(response)
                    }
                  })
                } else {
                  // resp.pages = total
                  resp.products = result.data
                  // resp.bestProducts = bestProducts.data
    
                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              }
      }

    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }

  }



  this.newProductListService = async (request, callback) => {
    try {
      var response = {}
      var managerStoreObject = new managerStore()
      var storeProductsObject = new storeProducts()
      var userDaoObject = new userDao()
      var resp = {}
      if (request.type == 'CATEGORY') {
        var object = { categoryId: request.id }
      } else {
        var object = { productSubCategoryId: request.id }
      }
      var getMyProducts = await managerStoreObject.storProductListDao(request)
      if(getMyProducts.error){
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        var ids = []
        if(getMyProducts.data.length > 0){
          getMyProducts.data.map(item => {
            ids.push(item.productId)
          })
          }
          request.ids = ids
          request.queryType = 'TOTAL'
          var totalResult = await storeProductsObject.getNewProductListtDao(request, object)
          if (totalResult.error) {
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            if (totalResult.data.length > 0) {
              request.pageCount = 10
              request.queryType = 'LIST'
              // console.log(totalResult.data.length)
    
              var total = totalResult.data.length / request.pageCount
              if (total % 1 !== 0) {
                total++
                total = Math.trunc(total)
              }
              request.queryType = 'LIST'
              // console.log(request)
              var result = await storeProductsObject.getNewProductListtDao(request, object)
              if (result.error) {
                response.error = 'true'
                response.message = 'fetch failed'
                callback(response)
              } else {
                var products = result.data
                var length = products.length
                if (length > 0) {
                  async.eachOfSeries(products, async function (item, index) {
                    var req = {
                      productId: item.id
                    }
                    var productImagesDao = await userDaoObject.productImagesDao(req)
                    products[index].productImages = productImagesDao.result
                    if (--length === 0) {
                      resp.pages = total
                      resp.products = products
                      // resp.bestProducts = bestProducts.data
    
                      response.error = 'false'
                      response.message = 'Success'
                      response.data = resp
                      callback(response)
                    }
                  })
                } else {
                  resp.pages = total
                  resp.products = result.data
                  // resp.bestProducts = bestProducts.data
    
                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              }
            } else {
              resp.pages = 0
              resp.products = totalResult.data
              // resp.bestProducts = bestProducts.data
    
              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }

        // } else {
        //   resp.products = []
        //   response.error = 'false'
        //   response.message = 'Success'
        //   response.data = resp
        //   callback(response)
        // }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.addnewProductService = async (request, callback) => {
    try {
      var response = {}
      var storeProductsObject = new storeProducts()
      var checkProduct = await storeProductsObject.checkStoreProductDao(request)
      if(checkProduct.error){
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        if(checkProduct.data.length === 0){
          var storeObejct = {}
          storeObejct.storeId = request.storeId
          storeObejct.productId = request.productId
          storeObejct.categoryIds = request.categoryId

          var save = await storeProductsObject.addStoreNewProducts(storeObejct)
          if(save.error){
            response.error = 'true'
            response.message = 'fetch failed'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = "Product can't added"
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }
}
