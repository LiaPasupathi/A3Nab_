module.exports = function () {
  const db = require('../../db.js')

  this.getstoreDetailsGetid = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('store')
        .where({ id: data.storeId })
        .then((result) => {
          response.error = false
          response.result = result
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  this.getStoteDueAmountDao = (data, isPaid) => {
    return new Promise(async function (resolve) {
      var response = {}
      //   console.log(data)
      // db.raw("SELECT SUM(supplyPrice) as tot FROM `orderItems` WHERE storeId = 2 AND isPaid = 0 AND (createdAt BETWEEN ? AND ?)", [data.fromDate, data.toDate])
      db('orderItems')
        .select('isPaid', 'orderItems.storeId', db.raw('YEAR(createdAt) as year'), db.raw('MONTH(createdAt) as month'), db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
        .where({ 'orderItems.storeId': data.storeId })
        .whereRaw('DATE(createdAt) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
        .where('isPaid', isPaid)
      // .whereIn('orderItems.storeStatus', ['ACCEPTED', 'PICKUP', 'ONGOING'])
        .groupBy('storeId', 'month', 'year', 'isPaid')
        .then((result) => {
          // console.log(result[0])
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

  this.geDueOrderCountDao = (data, isPaid) => {
    return new Promise(async function (resolve) {
      var response = {}
      //   console.log(data)
      // db.raw("SELECT SUM(supplyPrice) as tot FROM `orderItems` WHERE storeId = 2 AND isPaid = 0 AND (createdAt BETWEEN ? AND ?)", [data.fromDate, data.toDate])
      db('orderItems')
        .select('orderId', 'storeId')
        .where({ 'orderItems.storeId': data.storeId })
        .whereRaw('DATE(createdAt) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
        .where('isPaid', isPaid)
      // .whereIn('orderItems.storeStatus', ['ACCEPTED', 'PICKUP', 'ONGOING'])
        .groupBy('storeId', 'orderId')
      // .count('id as count')
        .then((result) => {
          // console.log(result[0])
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

  this.managerTotalOrdersCountDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('managerOrders')
        .where({ managerId: data.id, storeId: data.storeId })
        .count('id as count')
        .then((result) => {
          response.error = false
          response.result = result
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  this.managerTotalOrdersRevenueDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .innerJoin('managerOrders', 'orderItems.orderId', '=', 'managerOrders.orderId')
        .where({ 'orderItems.storeId': data.storeId, 'managerOrders.managerId': data.id })
        .sum('supplyPrice as revenue')
        .then((result) => {
          response.error = false
          response.result = result
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  this.getOrderTransactionDao = (data) => {
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
        .select('managerOrders.id', 'managerOrders.orderId', 'orders.orderIDs', 'deliveryOn', 'orderOn', 'deliveryDate', db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
        .innerJoin('orders', 'managerOrders.orderId', '=', 'orders.id')
        .innerJoin('orderItems', 'managerOrders.orderId', '=', 'orderItems.orderId')
        .where({ 'managerOrders.storeId': data.storeId, managerId: data.id })
        .groupBy('managerOrders.id', 'orderItems.orderId')
        .orderBy('managerOrders.id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          if (data.fromDate && data.toDate) {
            queryBuilder.whereRaw('DATE(orders.orderOn) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
          }
          if (data.fromDate && data.toDate == '') {
            queryBuilder.whereRaw('DATE(orderOn) = ?', [data.fromDate])
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

  this.getManagerNotificationDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('notificationList')
       .where({ stoteManagerId: data.id })
       .orderBy('id', 'desc')
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
}
