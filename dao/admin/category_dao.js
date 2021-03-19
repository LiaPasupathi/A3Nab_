module.exports = function () {
  const db = require('../../db.js')

  this.saveCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('category')
        .insert(data)
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.categoryNameCheckDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('category')
      .where('categoryName', data.categoryName)
      .where('isDelete', 0)
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getAllCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('category')
        .where('isDelete', 0)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.categoryProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('id', 'productName')
        .where('categoryId', data.categoryId)
        .where('isDelete', 0)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.saveProductCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_category')
        .insert(data)
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getProductCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_category')
        .where({ categoryId: data.categoryId })
        .where('isDelete', 0)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getAdminProductSubCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_sub_category')
        .where({ productCategoryId: data.id })
        .where('isDelete', 0)
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

  this.adminGetProductListDao = (object, isActive, isBest) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('id', 'categoryId', 'productCategoryId', 'productSubCategoryId', 'storeId', 'productName', 'arabicName', 'qty', 'maxQty', 'productStatus', 'qty as productWeight', 'productPrice', 'productDiscount', 'productDiscountStatus', 'productDescription', 'isBestProduct', 'orderVariants', 'specialInstructions', 'instructionsStatus', 'differentPriceVariant', 'isComingSoon', 'managerPrice')
        .where(object)
        .where('isDelete', 0)
        .orderBy('id', 'desc')
        .modify(function (queryBuilder) {
          if (isActive === 'active') {
            queryBuilder.where('productStatus', isActive)
          }
          if(isBest){
            if(isBest === 'YES'){
              queryBuilder.where('isBestProduct', 1)
            } else {
              queryBuilder.where('isBestProduct', 0)
            }
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

  this.addSubSubCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_sub_category')
        .insert(data)
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.findSubCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_category')
        .where({ id: data.id })
        .where('isDelete', 0)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.findSubSubCategoryDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_sub_category')
        .where({ productCategoryId: id })
        .where('isDelete', 0)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.categoeyStatusChangeDao = (table, id, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db(table)
        .where({ id: id })
        .update(object)
        .then((result) => {
          response.error = false
          response.result = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.searchCategoryDao = (table, query, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db(table)
        .whereRaw(query)
        .where('isDelete', 0)
        .orderBy('id', 'desc')
        .modify(function (queryBuilder) {
          if (object) {
            queryBuilder.where(object)
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

  this.searchProductNameDao = (table, query, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db(table)
        .select('product.id', 'categoryId', 'productCategoryId', 'productSubCategoryId', 'storeId', 'productName', 'arabicName', 'qty', 'maxQty', 'productStatus', 'qty as productWeight', 'productPrice', 'productDiscount', 'productDiscountStatus', 'productDescription', 'isBestProduct', 'orderVariants', 'specialInstructions', 'instructionsStatus', 'differentPriceVariant', 'isComingSoon', 'managerPrice')
        .innerJoin('product_image', 'product.id', '=', 'product_image.productId' )
        .whereRaw(query)
        .where('isDelete', 0)
        .groupBy('product.id')
        .orderBy('id', 'desc')
        .modify(function (queryBuilder) {
          if (object) {
            queryBuilder.where(object)
          }
        })
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
        })
        .catch((error) => {
          // console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.checkEditCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('category')
        .where('categoryName', data.categoryName)
        .where('isDelete', 0)
        .where('id', '!=', data.id)
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

  this.updateCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('category')
        .where('id', data.id)
        .update(data)
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

  this.checkEditProCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('product_category')
        .where('productCategoryName', data.productCategoryName)
        .where('isDelete', 0)
        .where('id', '!=', data.id)
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

  this.updateProCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('product_category')
        .where('id', data.id)
        .update(data)
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

  this.checkEditSubSubCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('product_sub_category')
        .where('productSubCategoryName', data.productSubCategoryName)
        .where('isDelete', 0)
        .where('id', '!=', data.id)
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

  this.updateSubSubCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('product_sub_category')
        .where('id', data.id)
        .update(data)
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

  this.deleteCategoryDao = (object, table) => {
    return new Promise(async function (resolve) {
      var response = {}
      db(table)
        .where({ id: object.id })
        .update(object)
        .then((result) => {
          response.error = false
          response.result = result
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

  this.deleteCategoryProductDao = (object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
         .where(object)
        .update('isDelete', 1)
        .then((result) => {
          response.error = false
          response.result = result
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

  // Active

  this.activeCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('category')
        .where('isDelete', 0)
        // .where('categoryStatus', '=', data.status)
        .orderBy('id','desc')
        .modify(function (queryBuilder) {
          if(data.status === 'active'){
            queryBuilder.where('categoryStatus', '=', data.status)
          }
        })
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

  this.activesubCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('product_category')
        .where({isDelete: 0, categoryId: data.categoryId})
        // .where('productCategoryStatus', '=', data.status)
        .orderBy('id','desc')
        .modify(function (queryBuilder) {
          if(data.status === 'active'){
            queryBuilder.where('productCategoryStatus', '=', data.status)
          }
        })
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

  this.activesubsubCategoryDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
      db('product_sub_category')
        .where({isDelete: 0, productCategoryId: data.productCatgory})
        // .where('productSubCategoryStatus', '=',  data.status)
        .orderBy('id','desc')
        .modify(function (queryBuilder) {
          if(data.status === 'active'){
            queryBuilder.where('productSubCategoryStatus', '=',  data.status)
          }
        })
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

}
