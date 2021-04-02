module.exports = function () {
  const db = require('../../db.js')

  this.bestProductsDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('product')
        .select('product.id', 'product.categoryId', 'product.productCategoryId', 'product.productSubCategoryId', 'storeProducts.storeId', 'storeStock', 'product.productName', 'product.productStatus', 'qty as productWeight', 'storeProducts.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'storeProductStatus', 'product.createdAt', 'product.updatedAt')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .where({ productStatus: 'active', isDelete: 0, 'storeProducts.storeId': data.storeId })
        .where({ 'storeProducts.storeId': data.storeId })
        .orderBy('product.id', 'desc')
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  this.getProductListtDao = (data, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      if (data.queryType === 'LIST') {
        var pageNumber = data.pageNumber
        if (pageNumber == '0') {
          pageNumber = '0'
        } else {
          pageNumber = pageNumber - 1
        }
        var pageOffset = parseInt(pageNumber * data.pageCount)
      }
      db('product')
        .select('product.id', 'product.categoryId', 'product.productCategoryId', 'product.managerPrice', 'product.productSubCategoryId', 'storeProducts.storeId', 'storeStock', 'product.productName', 'product.productStatus', 'storeProductStatus', 'qty as productWeight', 'storeProducts.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .where({ productStatus: 'active', isDelete: 0, 'storeProducts.storeId': data.storeId })
        .where(object)
        .orderBy('id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          // if (data.productList == 'OUTOFSTOCK') {
          //   queryBuilder.where('storeStock', 0)
          // }
        })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((result) => {
          console.log(result)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getproductOutOfStockDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      if (data.queryType === 'LIST') {
        var pageNumber = data.pageNumber
        if (pageNumber == '0') {
          pageNumber = '0'
        } else {
          pageNumber = pageNumber - 1
        }
        var pageOffset = parseInt(pageNumber * data.pageCount)
      }
      db('product')
        .select('product.id', 'product.categoryId', 'product.productCategoryId', 'product.managerPrice', 'product.productSubCategoryId', 'storeProducts.storeId', 'storeStock', 'product.productName', 'product.productStatus', 'storeProductStatus', 'qty as productWeight', 'storeProducts.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .where({ isDelete: 0, 'storeProducts.storeId': data.storeId })
        .orderBy('id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          if (data.type == 'OUTOFSTOCK') {
            queryBuilder.where('storeStock', 0)
          } else {
            queryBuilder.where('storeStock', '>=', '10')
          }
        })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((result) => {
          console.log(result)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.productSearchDao = (data, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('product.id', 'productName', 'qty as productWeight', 'product.managerPrice', 'storeProducts.productPrice', 'storeProducts.storeId', 'productDiscount', 'storeStock', 'productDiscountStatus', 'storeProductStatus', 'instructionsStatus')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .where({ productStatus: 'active', 'storeProducts.storeId': object.storeId })
        .where(data)
        .whereRaw('( productName LIKE  "%' + object.name + '%" )')
        .orderBy('product.id', 'desc')
        .then((result) => {
          response.error = 'false'
          response.result = result
        })
        .catch((error) => {
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }
  this.getUserBestProductDao = (data) => {
    return new Promise(async function (resolve) {
      // isBestProduct: 1,
      var response = {}
      if (data.queryType === 'LIST') {
        var pageNumber = data.pageNumber
        if (pageNumber == '0') {
          pageNumber = '0'
        } else {
          pageNumber = pageNumber - 1
        }
        var pageOffset = parseInt(pageNumber * data.pageCount)
      }
      db('product')
        .select('product.id', 'productName', 'qty as productWeight', 'storeProducts.productPrice', 'storeProductStatus', 'storeProducts.storeId', 'productDiscount', 'productDiscountStatus', 'instructionsStatus')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .where({ productStatus: 'active', 'storeProducts.storeId': data.storeId })
        .orderBy('id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
        })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateStockCountService = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where({ productId: data.productId, storeId: data.storeId })
        .update({storeStock: data.storeStock})
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }


  this.updateStockCountPriceService = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where({ productId: data.productId, storeId: data.storeId })
        .update({storeStock: data.storeStock, productPrice: data.productPrice})
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.addVendorProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('vendorProducts')
        .insert(data)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.viewStockHistoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('vendorProducts')
        .select('vendorProducts.id', 'vendorName', 'firstName as managerName', 'stockType', 'units', 'expiryDate', 'StockReason', db.raw('DATE_FORMAT(vendorProducts.createdAt, "%d/%m/%Y") AS date'), 'vendorProducts.createdAt')
        .innerJoin('vendor', 'vendorProducts.vendorId', '=', 'vendor.id')
        .leftJoin('storemanager', 'vendorProducts.managerId', '=', 'storemanager.id')
        .where({'vendorProducts.productId': data.productId, 'vendorProducts.storeId': data.storeId})
        .orderBy('vendorProducts.id', 'desc')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateStoreProductStatusDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where({ productId: data.productId, storeId: data.storeId })
        .update('storeProductStatus', data.storeProductStatus)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.changeStoreCategoryProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where({ categoryIds: data.categoryId, storeId: data.storeId })
        .update('storeProductStatus', data.storeProductStatus)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }
  
  this.getNewProductListtDao = (data, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      if (data.queryType === 'LIST') {
        var pageNumber = data.pageNumber
        if (pageNumber == '0') {
          pageNumber = '0'
        } else {
          pageNumber = pageNumber - 1
        }
        var pageOffset = parseInt(pageNumber * data.pageCount)
      }

      db('product')
        .select('product.id', 'product.categoryId', 'product.productCategoryId', 'product.managerPrice', 'productPrice', 'product.productSubCategoryId', 'product.productName', 'product.productStatus', 'qty as productWeight', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        // .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .where({ productStatus: 'active', isDelete: 0 })
        // .where(object)
        .whereNotIn('product.id', data.ids)
        .where(object)
        .orderBy('id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST') {
            // console.log(data.pageCount)
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
        })
        .then((result) => {
          // console.log(result.length)
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getSearchNewProductListtDao = (data, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('product.id', 'product.categoryId', 'product.productCategoryId', 'productPrice', 'product.productSubCategoryId', 'product.productName', 'product.productStatus', 'qty as productWeight', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        // .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .where({ productStatus: 'active', isDelete: 0, })
        .whereRaw('( productName LIKE  "%' + data.text + '%" )')
        .where(object)
        .whereNotIn('product.id', data.ids)
        .orderBy('id', 'desc')
        
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }


  this.checkStoreProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where({ storeId: data.storeId, productId: data.productId })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }


  this.addStoreNewProducts = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .insert(data)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }
}
