module.exports = function () {
  var productDao = require('../../dao/admin/product_dao')
  var async = require('async')

  this.addProductService = async (request, callback) => {
    try {
      var response = {}
      var saveObject = {}
      var val = Math.floor(1000 + Math.random() * 9000)
      // console.log(request)
      saveObject.productName = request.productName
      saveObject.arabicName = request.arabicName
      saveObject.productPrice = request.productPrice
      saveObject.productDiscount = request.productDiscount
      saveObject.qty = request.qty
      saveObject.maxQty = request.maxQty
      saveObject.productCode = '#Pro' + val
      // saveObject.orderVariants = request.orderVariants
      saveObject.instructionsStatus = request.instructionsStatus
      saveObject.managerPrice = request.managerPrice
      saveObject.isComingSoon = request.isComingSoon
      // saveObject.differentPriceVariant = request.differentPriceVariant
      saveObject.categoryId = request.categoryId
      saveObject.productCategoryId = request.productCategoryId
      if (request.productSubCategoryId) {
        saveObject.productSubCategoryId = request.productSubCategoryId
      }
      // saveObject.storeId = request.storeId

      var productObject = new productDao()
      var saveProduct = await productObject.saveProductDao(saveObject)
      // console.log(saveProduct)
      if (saveProduct.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        var productId = saveProduct.data[0]
        var cutting = JSON.parse(request.cuttingStyle)
        var boxStyle = JSON.parse(request.boxStyle)
        var images = JSON.parse(request.images)
        var relatedProduct = JSON.parse(request.relatedProducts)
        request.relatedProducts = relatedProduct
        request.storeIds = JSON.parse(request.storeId)
        await this.saveCuttingStyleService(cutting, productId, 'cuttingStyle')
        await this.saveCuttingStyleService(boxStyle, productId, 'boxStyle')
        await this.saveImageProductImages(images, productId)
        await this.relatedProductService(request, productId)
        await this.storeProductService(request, productId)
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.saveCuttingStyleService = (cutting, productId, type) => {
    return new Promise(async function (resolve) {
      var response = {}
      var length = cutting.length
      if (type === 'cuttingStyle') {
        var table = 'cuttingStyle'
      } else {
        var table = 'boxStyle'
      }
      var productObject = new productDao()
      await productObject.productDeleteDao(productId, table)
      if (length > 0) {
        async.eachOfSeries(cutting, async function (item) {
          if (type === 'cuttingStyle') {
            var object = { productId: productId, arabicName: item.arabicName, cuttingName: item.cuttingName, cuttingPrice: item.cuttingPrice }
          } else {
            var object = { productId: productId, arabicName: item.arabicName, boxName: item.boxName, boxPrice: item.boxPrice }
          }
          if (item.cuttingName || item.boxName) {
            await productObject.saveVariantsDao(object, type)
          }
          if (--length === 0) {
            response.error = false
            resolve(response)
          }
        })
      } else {
        response.error = false
        resolve(response)
      }
    })
  }

  this.storeProductService = (req, productId) => {
    return new Promise(async function (resolve) {
      var response = {}
      var products = req.storeIds
      var length = products.length
      // var table = 'relatedProducts'
      var productObject = new productDao()
      await productObject.storeDeleteDao(productId)
      if (length > 0) {
        async.each(products, async function (item) {
          var object = { productId: productId, categoryIds: req.categoryId, storeId: item.id, productPrice: req.productPrice }
          await productObject.saveStoreProductDao(object)
          if (--length === 0) {
            response.error = false
            resolve(response)
          }
        })
      } else {
        response.error = false
        resolve(response)
      }
    })
  }

  this.relatedProductService = (req, productId) => {
    return new Promise(async function (resolve) {
      var response = {}
      var products = req.relatedProducts
      var length = products.length
      var table = 'relatedProducts'
      var productObject = new productDao()
      // await productObject.productDeleteDao(productId, table)
      if (length > 0) {
        async.each(products, async function (item) {
          var object = { productId: productId, relatedId: item.id, relCategory: req.relCategory, relProCategory: req.relProCategory }
          if (req.relsubCategory) {
            object.relsubCategory = req.relsubCategory
          }
          // console.log(object)
          await productObject.saveRelatedProductDao(object)
          if (--length === 0) {
            response.error = false
            resolve(response)
          }
        })
      } else {
        response.error = false
        resolve(response)
      }
    })
  }

  this.saveVariantService = (variants, productId) => {
    return new Promise(async function (resolve) {
      var response = {}
      var length = variants.length
      var table = 'productVariants'
      var productObject = new productDao()
      await productObject.productDeleteDao(productId, table)
      if (length > 0) {
        async.eachOfSeries(variants, async function (item) {
          var object = { productId: productId, name: item.name, image: item.image, price: item.price, stock: item.stock, variantStatus: item.variantStatus }
          console.log(object)
          await productObject.saveVariantsDao(object)
          if (--length === 0) {
            response.error = false
            resolve(response)
          }
        })
      } else {
        response.error = false
        resolve(response)
      }
    })
  }

  this.saveImageProductImages = (images, productId) => {
    return new Promise(async function (resolve) {
      var response = {}
      var length = images.length
      var productObject = new productDao()
      var table = 'product_image'
      await productObject.productDeleteDao(productId, table)
      if (length > 0) {
        async.each(images, async function (item) {
          var object = { productId: productId, productImage: item.productImage }
          await productObject.saveProductImagesDao(object)
          if (--length === 0) {
            response.error = false
            resolve(response)
          }
        })
      } else {
        response.error = false
        resolve(response)
      }
    })
  }

  this.adminProductListService = async (request, callback) => {
    var response = {}
    try {
      var productObject = new productDao()
      // console.log(request)
      request.queryType = 'TOTAL'
      var allProducts = await productObject.adminProductsDao(request)
      if (allProducts.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (allProducts.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 10
          var result = await productObject.adminProductsDao(request)
          if (result.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
            callback(response)
          } else {
            var total = result.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            var productList = result.data
            var length = productList.length
            if (length > 0) {
              async.eachOfSeries(productList, async function (item, index) {
                var cuttingData = await productObject.findProductCuttingStyleDao(item.id)
                var boxData = await productObject.findProductBoxStyleDao(item.id)
                // var releatedData = await productObject.findProductReletedProductDao(item.id)
                // var storeProduct = await productObject.findProductstoreProductDao(item.id)
                var sellCount = await productObject.productSellCountDao(item.id)
                productList[index].relatedId = ''
                productList[index].relCategory = ''
                productList[index].relProCategory = ''
                productList[index].relsubCategory = ''
                // if (releatedData.data.length > 0) {
                //   productList[index].relatedId = releatedData.data[0].relatedId
                //   productList[index].relCategory = releatedData.data[0].relCategory
                //   productList[index].relProCategory = releatedData.data[0].relProCategory
                //   productList[index].relsubCategory = releatedData.data[0].relsubCategory
                // }
                productList[index].cuttingStyle = cuttingData.data
                productList[index].boxStyle = boxData.data
                // productList[index].storeProduct = storeProduct.data
                productList[index].sellCount = sellCount.data[0].count
                // productList[index].relatedProduct = releatedData.data
                if (--length === 0) {
                  response.error = 'false'
                  response.message = 'Success'
                  response.pages = total
                  response.products = productList
                  callback(response)
                }
              })
            } else {
              response.error = 'false'
              response.message = 'Success'
              response.pages = total
              response.productList = result.data
              callback(response)
            }
          }
        } else {
          response.error = 'false'
          response.message = 'Success'
          response.pages =
          response.productList = allProducts.data
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
      callback(response)
    }
  }

  this.editProductProductService = async (request, callback) => {
    try {
      var response = {}
      var saveObject = {}
      saveObject.productName = request.productName
      saveObject.arabicName = request.arabicName
      saveObject.productPrice = request.productPrice
      saveObject.productDiscount = request.productDiscount
      saveObject.qty = request.qty
      saveObject.maxQty = request.maxQty
      // saveObject.orderVariants = request.orderVariants
      saveObject.instructionsStatus = request.instructionsStatus
      // saveObject.differentPriceVariant = request.differentPriceVariant
      saveObject.managerPrice = request.managerPrice
      saveObject.isComingSoon = request.isComingSoon
      saveObject.categoryId = request.categoryId
      saveObject.productCategoryId = request.productCategoryId
      saveObject.productSubCategoryId = null
      saveObject.id = request.id
      if (request.productSubCategoryId) {
        saveObject.productSubCategoryId = request.productSubCategoryId
      }
      // saveObject.storeId = request.storeId
      // console.log(saveObject)
      // return;
      var productObject = new productDao()
      var update = await productObject.updateProductDao(saveObject)
      // console.log(update)
      if (!update.error) {
        var productId = request.id
        var cutting = JSON.parse(request.cuttingStyle)
        var boxStyle = JSON.parse(request.boxStyle)
        var images = JSON.parse(request.images)
        var relatedProduct = JSON.parse(request.relatedProducts)
        request.storeIds = JSON.parse(request.storeId)
        request.relatedProducts = relatedProduct
        await this.saveCuttingStyleService(cutting, productId, 'cuttingStyle')
        await this.saveCuttingStyleService(boxStyle, productId, 'boxStyle')
        await this.saveImageProductImages(images, productId)
        await this.relatedProductService(request, productId)

        await this.storeProductService(request, productId)

        response.error = 'false'
        response.message = 'Success'
      } else {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.deleteProductOptionService = async (request, callback) => {
    try {
      var response = {}
      var object = { activeStatus: 0 }
      var productObject = new productDao()
      var result = await productObject.deleteProductOptionDao(object, request)
      if (result.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.deleteProductOptionService = async (request, callback) => {
    try {
      var response = {}
      var object = { activeStatus: 0 }
      var productObject = new productDao()
      var result = await productObject.deleteProductOptionDao(object, request)
      if (result.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.adminStarProductService = async (request, callback) => {
    try {
      var response = {}
      var object = { isBestProduct: request.star, id: request.productId }
      var productObject = new productDao()
      var result = await productObject.updateProductDao(object)
      if (result.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }
  
}
