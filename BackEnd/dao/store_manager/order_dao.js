module.exports = function () {
  const db = require('../../db.js')

  this.getOrderDetailsDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .select('orderIDs', 'orderId', 'storeId', 'orderOn', 'deliveryOn', db.raw("'PENDING' as orderStatus"))
        .innerJoin('orders', 'orderItems.orderId', '=', 'orders.id')
        .where({ storeId: data.storeId, isAssign: 0, 'adminApprove': 'ACCEPTED', storeDelete: '0' })
        .groupBy('orderId')
        .orderBy('orderId', 'desc')
        .limit(3)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          response.error = true
          reject(error)
        })
    })
  }

  this.getHomeOrderListDao = (data, status) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('managerOrders')
      .select('orderIDs', 'orderId', 'storeId', 'orderOn', 'deliveryOn', 'deleteItems', 'orders.orderStatus')
      .innerJoin('orders', 'managerOrders.orderId', '=', 'orders.id')
      // .whereIn('managerOrders.status', data.con)
      .where({ storeId: data.storeId, 'orders.orderStatus': status, storeDelete: '0'  })
      .groupBy('orderId')
      .orderBy('orderId', 'desc')
      .limit(3)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          response.error = true
          reject(error)
        })
    })
  }

  this.getStoteRevenueGraphDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select( db.raw('YEAR(createdAt) year'), db.raw('MONTH(createdAt) month'), db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
        .where({'orderItems.storeId': data.storeId })
        // .whereIn('orderItems.storeStatus', ['ACCEPTED', 'PICKUP', 'ONGOING'])
        .groupBy('year', 'month')
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

  this.getOutOfProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      console.log(data)
      db.raw("SELECT (SELECT COUNT(*) FROM storeProducts INNER JOIN product ON storeProducts.productId = product.id WHERE storeStock = '0' AND product.isDelete = '0' AND storeProducts.storeId = ? ) AS outOfStock, (SELECT COUNT(*) FROM storeProducts INNER JOIN product ON storeProducts.productId = product.id WHERE storeStock >= '10' AND product.isDelete = '0' AND storeProducts.storeId = ? ) AS lowStock", [data.storeId, data.storeId])
        .then((result) => {
          // console.log(result[0])
          response.error = false
          response.data = result[0]
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

  this.managerOrdersDao = (data) => {
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
        .select('orders.id', 'orderItems.orderId', 'orderIDs', 'orderItems.storeId', 'orderOn', 'deliveryOn', 'deleteItems')
        .innerJoin('orderItems', 'orders.id', '=', 'orderItems.orderId')
        .whereIn('isAssign', data.con)
        .where({ 'storeId': data.storeId, 'adminApprove': 'ACCEPTED', storeDelete: '0' })
        .groupBy('orders.id', 'orderItems.orderId')
        .orderBy('orderId', 'desc')
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
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.managerOrderListDao = (data) => {
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
      db('managerOrders')
        .select('orderIDs', 'orderId', 'storeId', 'orderOn', 'deliveryOn', 'deleteItems', 'orders.orderStatus')
        .innerJoin('orders', 'managerOrders.orderId', '=', 'orders.id')
        .whereIn('managerOrders.status', data.con)
        .where({ storeId: data.storeId, storeDelete: '0' })
        .groupBy('orderId')
        .orderBy('orderId', 'desc')
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
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateDeviceTokenDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .where({ id: data.id })
        .update({ os: data.os, fcmToken: data.fcmToken })
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

  this.updateOrderStatusDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .where({ storeId: data.storeId, orderId: data.orderId })
        .update('isAssign', 1)
        .then((result) => {
          response.error = false
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

  this.checkOrderStatusDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('managerOrders')
        .select('id', 'storeId', 'managerId', 'orderId', 'status')
        .where({ storeId: data.storeId, orderId: data.orderId })
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

  this.addManagerOrderStatus = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('managerOrders')
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

  this.updateManagerOrderStatus = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('managerOrders')
        .where({ storeId: data.storeId, orderId: data.orderId })
        .update(data)
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

  this.managerTotalEarnOrders = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('managerOrders')
        .select(db.raw('COALESCE(SUM(supplyPrice),0) as totalEarn'))
        .innerJoin('orderItems', 'managerOrders.orderId', '=', 'orderItems.orderId')
        .where({ 'managerOrders.storeId': data.storeId, 'managerOrders.managerId': data.id })
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

  this.managerTotalOrdersDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('managerOrders')
        .where({ 'managerOrders.storeId': data.storeId, 'managerOrders.managerId': data.id })
        .count('id as totalOrders')
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

  this.getManagerOrderItems = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
      .select('orderItems.id', 'orderItems.orderId', 'orderItems.productId', 'productName', 'orderItems.storeId', 'quantity', 'product.productStatus', 'categoryId', 'productCategoryId', 'productSubCategoryId', 'discount', 'supplyPrice', 'price', 'orderInstructions', 'cuttingName', 'cuttingPrice', 'boxName', 'boxPrice',)
      .innerJoin('product', 'orderItems.productId', '=', 'product.id')
      // .leftJoin('product_image', 'orderItems.productId', '=', 'product_image.productId')
      .leftJoin('cuttingStyle', 'orderItems.cuttingStyleId', '=', 'cuttingStyle.id')
      .leftJoin('boxStyle', 'orderItems.boxStyleId', '=', 'boxStyle.id')
      .where({ 'orderItems.storeId': data.storeId, 'orderItems.orderId': data.orderId })
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

  this.managerOrderValue = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .select(db.raw('COALESCE(SUM(supplyPrice),0) as totalvalue'))
        .where({ 'orderItems.storeId': data.storeId, 'orderItems.orderId': data.orderId })
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

  this.checkOrderID = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orders')
        .select('orders.id', 'orderIDs', 'userId', 'firstName as driverName', 'mobileNumber as driverNumber', 'orderOn', 'deliveryOn', 'ordertax', 'type', 'deleteItems', 'orderStatus')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .leftJoin('driver', 'orders.as_driverId', '=', 'driver.id')
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

  this.checkOrderItemsDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .select('id', 'orderId', 'productId', 'storeId', 'price', 'supplyPrice')
        .where({ id: data.id })
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

  this.removeOrderPriceDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .where('id', data.orderId)
        .decrement({ grandTotal: data.price, totalAmount: data.price })
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

  this.deleteOrderItemsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .where('id', data.id)
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

  this.getAdminOrderItems = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .where('orderId', data.orderId)
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

  this.checkReplaceOrderItemsDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .where({ 'orderItems.id': data })
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

  this.viewstoreProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storeProducts')
        .where({ 'productId': data.productId, 'storeId': data.storeId })
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

  this.replaceOrderDao = (data) => {
    return new Promise(async function (resolve) {
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

  this.replaceOrderItemsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
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

  this.updateOrderItemsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .where({ storeId: data.storeId, orderId: data.orderId })
        .update('storeStatus', data.storeStatus)
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

  this.getStoreVendorDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('vendor')
        .where({ storeId: data.storeId, activeStatus: 1 })
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

  this.addNewVendorDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('vendor')
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
