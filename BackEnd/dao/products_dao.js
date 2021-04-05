module.exports = function () {
  const db = require('../db.js')
  var async = require('async')

  this.saveFavProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('favourite_products')
        .insert({ productId: data.productId, userId: data.id, storeId: data.storeId })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.delFavProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('favourite_products')
        .where({ productId: data.productId, userId: data.id, storeId: data.storeId })
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

  this.productAppSettings = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('appSettings')
        .select('minimumOrderValue', 'quickDelivery', 'flatRate', 'perKM', 'taxAmount', 'QuickDeliveryPerKM', 'fastDelievryCharge')
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

  this.checkUserFavProduct = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('favourite_products')
        .where({ productId: data.productId, userId: data.userId })
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

  this.getProdudctVariantDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('productVariants')
        .where({ productId: data.productId })
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

  this.viewProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('product.id', 'product.categoryId', 'product.arabicName', 'maxQty', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'sub_processingMin', 'product.productCategoryId', 'product.productSubCategoryId', 'storeProducts.storeId', 'storeStock', 'product.productName', 'product.productStatus', 'qty as productWeight', 'storeProducts.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        // .where('productStatus', 'active')
        // .where('isDelete', 0)
      // db('product')
        // .select('product.id', 'product.categoryId', 'product.productCategoryId', 'product.productSubCategoryId', 'product.storeId', 'product.productName', 'product.productStatus', 'product.productWeight', 'product.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .where({ 'product.id': data.productId, 'product.isDelete': 0, 'product.productStatus': 'active' })
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

  this.checkMyCartProduct = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cart')
        .select('id', 'productId', 'userId', 'quantity')
        .where({ productId: data.productId, userId: data.id })
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

  this.addMycartDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      if(data.cuttingStyle){
        data.cuttingStyle = data.cuttingStyle
      } else {
        data.cuttingStyle = null
      }

      if(data.boxStyle){
        data.boxStyle = data.boxStyle
      } else {
        data.boxStyle = null
      }
      db('cart')
        .insert({ productId: data.productId, userId: data.id, quantity: 1, specialInstructions: data.specialInstructions, storeId: data.storeId,  cuttingStyle: data.cuttingStyle, boxStyle: data.boxStyle })
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

  this.updateMycartDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      if(data.cuttingStyle){
        data.cuttingStyle = data.cuttingStyle
      } else {
        data.cuttingStyle = null
      }

      if(data.boxStyle){
        data.boxStyle = data.boxStyle
      } else {
        data.boxStyle = null
      }
      db('cart')
        .update({ quantity: data.quantity, specialInstructions: data.specialInstructions, storeId: data.storeId, cuttingStyle: data.cuttingStyle, boxStyle: data.boxStyle })
        .where({ productId: data.productId, userId: data.id, id: data.cartId })
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

  this.removeCartDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cart')
        .where('id', data.cartId)
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

  this.removeCartItemDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cart')
        .where('userId', data.id)
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
  
    this.removeFavItemDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('favourite_products')
        .where('userId', data.id)
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

  this.getMyCardItems = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      var ids = []
      db('cart')
      .select('cart.id',  'cart.productId', 'cart.storeId')
      .innerJoin('product', 'cart.productId', '=', 'product.id')
      .where({ userId: id, productStatus: 'active', 'product.isDelete': 0 })
        .then((result) => {
          if(result.length > 0){
            async.each(result, async function (item) {
              ids.push(item.storeId)
            })
            response.error = false
            response.data = ids
          } else {
            response.error = false
            response.data = result
          }
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

  this.getCardItems = (id, ids) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
      // .select('cart.id',  'cart.productId', 'productName', 'product.arabicName', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'minOrderTime as sub_processingMin', 'qty as productWeight',  'maxQty', 'cart.storeId', 'productDiscount', 'quantity', 'cuttingStyle', 'boxStyle', '.cart.specialInstructions', db.raw('SUM(storeProducts.productPrice  - ( storeProducts.productPrice  * ( productDiscount/100))) as singlePrice'), db.raw('SUM(storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) as totalPrice'), db.raw('SUM( (storeProducts.productPrice * quantity)- ( storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) ) as discountPrice'))
      .select('cart.id',  'cart.productId', 'productName', 'product.arabicName', 'product.categoryId', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'minOrderTime as sub_processingMin', 'qty as productWeight', 'maxQty','minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'minOrderTime as sub_processingMin', 'qty as productWeight', 'maxQty', 'cart.storeId', 'productDiscount', 'quantity', 'cuttingStyle', 'boxStyle', '.cart.specialInstructions', db.raw('SUM(storeProducts.productPrice  - ( storeProducts.productPrice  * ( productDiscount/100))) as singlePrice'), db.raw('SUM(storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) as totalPrice'), db.raw('SUM( (storeProducts.productPrice * quantity)- ( storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) ) as discountPrice'))
      .innerJoin('product', 'storeProducts.productId', '=', 'product.id')
      .innerJoin('cart', 'storeProducts.productId', '=', 'cart.productId')
      .innerJoin('category', 'product.categoryId', '=', 'category.id')
      .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
      .where({ userId: id, productStatus: 'active', 'product.isDelete': 0 })
      .whereIn('storeProducts.storeId', ids)
      .groupBy('cart.id',  'cart.productId')
      .orderBy('cart.id', 'desc')
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

  this.findStorePriceDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
       .select('id','productPrice', 'storeStock')
       .where({ productId: data.productId, storeId: data.storeId })
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

  this.cartTotalSumValue = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
      .select(db.raw('SUM(storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) as totalPrice'), db.raw('SUM( (storeProducts.productPrice * quantity)- ( storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) ) as discountPrice, SUM(storeProducts.productPrice * quantity ) as originalPrice'))
      .innerJoin('product', 'storeProducts.productId', '=', 'product.id')
      .innerJoin('cart', 'storeProducts.productId', '=', 'cart.productId')
      .where({ userId: id, productStatus: 'active', isDelete: 0 })
      .groupBy('cart.userId')
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

  // Reorder
  this.getReorderItems = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
      .select('orderItems.id',  'orderItems.productId', 'productName', 'orderItems.storeId', 'storeProducts.productPrice', 'storeStock', 'productDiscount', 'quantity', 'cuttingStyleId', 'boxStyleId', '.orderItems.orderInstructions', db.raw('SUM(storeProducts.productPrice  - ( storeProducts.productPrice  * ( productDiscount/100))) as singlePrice'), db.raw('SUM(storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) as totalPrice'), db.raw('SUM( (storeProducts.productPrice * quantity)- ( storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) ) as discountPrice'))
      .innerJoin('product', 'storeProducts.productId', '=', 'product.id')
      .innerJoin('orderItems', 'storeProducts.productId', '=', 'orderItems.productId')
      .where({ 'orderItems.orderId': id, productStatus: 'active', isDelete: 0 })
      .groupBy('orderItems.id',  'orderItems.productId', 'productName', 'orderItems.storeId', 'storeProducts.productPrice', 'storeStock', 'productDiscount', 'quantity', '.orderItems.orderInstructions')
      .orderBy('orderItems.id', 'desc')
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

  this.reOrderTotalSumValue = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
      .select(db.raw('SUM(storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) as totalPrice'), db.raw('SUM( (storeProducts.productPrice * quantity)- ( storeProducts.productPrice * quantity - ( storeProducts.productPrice * quantity * ( productDiscount/100))) ) as discountPrice, SUM(storeProducts.productPrice * quantity ) as originalPrice'))
      .innerJoin('product', 'storeProducts.productId', '=', 'product.id')
      .innerJoin('orderItems', 'storeProducts.productId', '=', 'orderItems.productId')
      .where({ 'orderItems.orderId': id, productStatus: 'active', isDelete: 0 })
      .groupBy('orderItems.orderId')
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

  this.userCheckReorderDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .select('orderItems.storeId')
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .where({ orderId: data.orderId, 'store.status': 'active' })
        .groupBy('orderItems.storeId')
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          response.error = true
          reject(error)
        })
    })
  }

  // this.checkMyCartProduct = (data) => {
  //   return new Promise(async function (resolve) {
  //     var response = {}
  //     db('cart')
  //       .select('id', 'productId', 'userId', 'quantity')
  //       .where({ productId: data.productId, userId: data.id })
  //       .then((result) => {
  //         response.error = false
  //         response.data = result
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         response.error = true
  //       })
  //       .finally(() => {
  //         resolve(response)
  //       })
  //   })
  // }

  this.userFavProductDao = (data) => {
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
      db('favourite_products')
        .select('product.id', 'favourite_products.id as favId', 'storeStock', 'product.categoryId', 'product.productCategoryId', 'product.productSubCategoryId', 'favourite_products.storeId', 'product.productName', 'product.productStatus', 'qty as productWeight', 'product.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status','product.maxQty', 'product.createdAt', 'product.updatedAt')
        .innerJoin('product', 'favourite_products.productId', '=', 'product.id')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .where({ 'favourite_products.userId': data.id, productStatus: 'active', isDelete: 0 })
        .orderBy('favId', 'desc')
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

  this.getRelatedProductsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('relatedProducts')
        .select('product.id', 'relatedProducts.id as relateId', 'product.categoryId', 'product.productCategoryId', 'product.productSubCategoryId', 'product.storeId', 'product.productName', 'product.productStatus', 'qty as productWeight', 'product.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .innerJoin('product', 'relatedProducts.relatedId', '=', 'product.id')
        .where({ 'relatedProducts.productId': data.productId, productStatus: 'active', isDelete: 0 })
        .orderBy('relateId', 'desc')
        .limit(10)
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

  this.getAllRelatedProductsDao = (data) => {
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
      db('relatedProducts')
        .select('product.id', 'relatedProducts.id as relateId', 'product.categoryId', 'product.productCategoryId', 'product.productSubCategoryId', 'product.storeId', 'product.productName', 'product.productStatus', 'qty as productWeight', 'product.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .innerJoin('product', 'relatedProducts.relatedId', '=', 'product.id')
        .where({ 'relatedProducts.productId': data.productId, productStatus: 'active', isDelete: 0 })
        .orderBy('relateId', 'desc')
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

  this.getPaymentDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('paymentType')
        .select('id', 'type', 'status')
        .where('status', 'active')
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

  this.getDeliveryTimeDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryTime')
        .select('id', 'fromTime', 'toTime', 'timeText', 'status')
        .where('status', 'active')
        .modify(function (queryBuilder) {
          if (data.dayId) {
            queryBuilder.where('dayId', data.dayId)
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

  this.saveOrdersDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
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

  this.saveOrderItems = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
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

  this.updateStoreStockCount = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where({ storeId: data.storeId, productId: data.productId })
        .decrement({ storeStock: data.quantity })
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

  this.updateProductQty = (totalOty, id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .where('id', id)
        .update('totalQuantity', totalOty)
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

  this.userSaveSearchDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('userSearch')
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

  this.removeUserCartDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cart')
        .where('userId', id)
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

  this.getUserOrderListDao = (data) => {
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
      db('orders')
        .select('orders.id', 'orderIDs', 'userId', 'orderStatus', 'paymentType.type', 'orderOn', 'deliveryOn', 'deliveryDate', 'totalAmount', 'discountAmount', 'grandTotal', 'taxvalue', 'ordertax', 'deleteItems', 'cancelDate', 'cancelReason')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .where('userId', data.id)
        .whereIn('orderStatus', data.con)
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

  this.checkUserOrderDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orders')
        .select('orders.id', 'orderIDs', 'orders.userId', 'orderStatus', 'taxvalue', 'ordertax', 'orderOn', 'deliveryOn', 'deliveryDate', 'totalAmount', 'discountAmount', 'grandTotal', 'totalQuantity', 'couponDiscount', 'couponDiscountPer', 'deleteItems', 'cancelDate', 'cancelReason', 'addressType', 'addressPinDetails', 'landmark', 'instruction', 'users_address.latitude', 'users_address.longitude', 'buildingName', 'addressId', 'timeId', 'timeText', 'paymentType.type as paytype', 'paymentId', 'fastDelievryCharge')
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
        .where({ 'orders.id': data.orderId })
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

  this.userOrderItemsDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .select('orderItems.id', 'orderId', 'orderItems.productId', 'product.arabicName', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'sub_processingMin', 'qty as productWeight', 'maxQty', 'cuttingStyle.arabicName as cuttingStyleAR', 'boxStyle.arabicName as boxStyleAr', 'cuttingName', 'cuttingPrice', 'boxName', 'boxPrice', 'quantity', 'productName', 'price as productPrice', 'discount as productDiscount', 'supplyPrice  as totalPrice')
        // .leftJoin('product_image', 'orderItems.productId', '=', 'product_image.productId')
        .innerJoin('product', 'orderItems.productId', '=', 'product.id')
        .leftJoin('cuttingStyle', 'orderItems.cuttingStyleId', '=', 'cuttingStyle.id')
        .leftJoin('boxStyle', 'orderItems.boxStyleId', '=', 'boxStyle.id')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where({ 'orderItems.orderId': data.orderId })
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

  this.updateUserOrderStatus = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orders')
        .where({ id: data.id })
        .update(data)
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

  this.updateUserOrderItemsStatus = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .where({ orderId: data.orderId })
        .update(data)
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

  this.checkCouponCodeDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('offers')
        .select('id', '	discount', 'minimumValue', 'startDate', 'endDate', 'offCategoryId', 'offProductId')
        .where({ couponCode: data.couponCode, status: 'active' })
        .whereRaw('DATE(startDate) <= ?', [db.raw('DATE(now())')])
        .whereRaw('DATE(endDate) >= ?', [db.raw('DATE(now())')])
        .where('count', '!=', '0')
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

  this.checkUserCouponCodeDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('offers')
        .select('offers.id', '	discount', 'minimumValue', 'startDate', 'endDate', 'offCategoryId', 'offProductId')
        .innerJoin('userCouponCode', 'offers.id', '=', 'userCouponCode.couponId')
        .where({ couponCode: data.couponCode, status: 'active', userId: data.id })
        .whereRaw('DATE(startDate) <= ?', [db.raw('DATE(now())')])
        .whereRaw('DATE(endDate) >= ?', [db.raw('DATE(now())')])
        .where('count', '!=', '0')
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

  this.userAvailableCodeDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('userCouponCode')
        .where({ couponId: data.couponId, userId: data.id })
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

  this.userWalletTransListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('walletTransaction')
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


  this.userSaveRatingDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      return db.transaction(function (t) {
        return db('rating')
          .transacting(t)
          .insert(data)
          // .then(function (response) {
          //   return db('orders').where('id', data.orderId).update('isRate',1)
          // })
          // .then(t.commit)
          // .catch(t.rollback)
      })
      .then(function (result) {
        return db('orders').where('id', data.orderId).update('isRate',1)
        .then(function (result) {
          console.log(result)
          response.error = false
          resolve(response)
        })

      })
      .catch(function (error) {
        console.log(error)
        response.error = true
        resolve(response)
      })
    })
  }

 

}
