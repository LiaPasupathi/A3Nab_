module.exports = function () {
  const db = require('../../db.js')

  this.saveProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
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

  this.saveVariantsDao = (data, table) => {
    return new Promise(async function (resolve) {
      var response = {}
      db(table)
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

  this.saveRelatedProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('relatedProducts')
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

  this.saveProductImagesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_image')
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

  this.adminProductsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      if (data.queryType === 'LIST' && data.searchType === false) {
        var pageNumber = data.pageNumber
        if (pageNumber == '0') {
          pageNumber = '0'
        } else {
          pageNumber = pageNumber - 1
        }
        var pageOffset = parseInt(pageNumber * data.pageCount)
      }
      db('product')
        .select('product.id', 'productName', 'product.arabicName', 'store.storeName', 'store.storeID', 'qty', 'maxQty', 'product.productPrice', 'productStatus', 'productDiscount', 'isBestProduct', 'product.categoryId', 'product.productCategoryId', 'productSubCategoryId', 'categoryName', 'productCategoryName', 'productSubCategoryName', 'product.isComingSoon', 'product.managerPrice', 'product.instructionsStatus')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .leftJoin('product_sub_category', 'product.productSubCategoryId', '=', 'product_sub_category.id')
        .where('product.isDelete', 0)
        .orderBy('product.id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST' && data.searchType === false) {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          if (data.fromDate && data.toDate) {
            queryBuilder.whereRaw('DATE(storeProducts.createdAt) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
          }
          // console.log(data.fromDate)
          if (data.fromDate && data.toDate == '') {
            queryBuilder.whereRaw('DATE(storeProducts.createdAt) = ?', [data.fromDate])
          }
          if(data.category){
            // Category
            queryBuilder.where('product.categoryId', data.category)
            if(data.category && data.productCategory){
              // Category and subcategory
              queryBuilder.where({ 'product.productCategoryId': data.productCategory })
              if(data.category && data.productCategory && data.productId) {
                queryBuilder.where({ 'product.categoryId': data.category, 
                'product.productCategoryId': data.productCategory, 
                'product.id': data.productId })
              }

              if(data.category && data.productCategory && data.subSubCategory) { 
                queryBuilder.where({ 
                  'product.categoryId': data.category, 
                'product.productCategoryId': data.productCategory, 
                'product.productSubCategoryId': data.subSubCategory,})
              }
            }
          }
        })
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

  this.findProductCuttingStyleDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cuttingStyle')
        .select('id', 'productId', 'cuttingName', 'arabicName', 'cuttingPrice')
        .where('productId', id)
        .where('activeStatus', 1)
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

  this.findProductBoxStyleDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('boxStyle')
        .select('id', 'productId', 'boxName', 'arabicName', 'boxPrice')
        .where('productId', id)
        .where('activeStatus', 1)
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

  this.findProductReletedProductDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('relatedProducts')
        .select('relatedProducts.id', 'productId', 'product.productName', 'relatedId', 'relCategory', 'relProCategory', 'relsubCategory')
        .innerJoin('product', 'relatedProducts.relatedId', '=', 'product.id')
        .where('productId', id)
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

  this.findProductstoreProductDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .select('store.id', 'storeName', 'storeName as itemName')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .where('storeProducts.productId', id)
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

  this.updateProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .where('id', data.id)
        .update(data)
        .then((result) => {
          console.log(result)
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

  this.productDeleteDao = (id, table) => {
    return new Promise(async function (resolve) {
      var response = {}
      db(table)
        .where('productId', id)
        .del()
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

  this.getProductVariantDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('productVariants')
        .where({ productId: id })
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

  this.getRelatedProductDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('relatedProducts')
        .select('relatedProducts.id', 'productName', 'productId', 'relatedId', 'relCategory', 'relProCategory', 'relsubCategory')
        .innerJoin('product', 'relatedProducts.productId', '=', 'product.id')
        .where({ productId: id })
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

  this.saveStoreProductDao = (data) => {
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

  this.storeDeleteDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where('productId', id)
        .del()
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

  this.productSellCountDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .where('productId', id)
        .count('orderItems.id as count')
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

  this.deleteProductOptionDao = (object, data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db(data.type)
        .where('id', data.id)
        .update(object)
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
