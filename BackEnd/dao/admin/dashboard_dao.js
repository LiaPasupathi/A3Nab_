module.exports = function () {
  const db = require('../../db.js')

  this.orderStatusCountDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
      db.raw("SELECT (SELECT COUNT(*) FROM orders WHERE orderStatus = 'COMPLETED' ) AS delivered, (SELECT COUNT(*) FROM orders WHERE orderStatus = 'PENDING' ) AS pending,  (SELECT COUNT(*) FROM orders ) AS totalOrders, (SELECT COUNT(*) FROM orders WHERE as_driverId IS NOT NULL AND orderStatus IN('ONGOING') ) AS assigned, (SELECT COUNT(*) FROM orders WHERE orderStatus = 'CANCELLED' ) AS cancelled, (SELECT COUNT(*) FROM product WHERE isDelete = '0' ) AS totalProducts, (SELECT COUNT(*) FROM offers WHERE offDelete = '0' ) AS totalOffers ")
        .then((result) => {
          response.error = false
          response.data = result[0]
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.dashboardOrderGraphDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('orders')
        .select(db.raw("MONTH(orderOn) as month"), db.raw('COALESCE(SUM(grandTotal),0) as amount'), db.raw('COUNT(orders.id) as orders'))
        .whereRaw('YEAR(orderOn) = ?', [data.year])
        .groupBy('month')
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.dashboardGenderGraphDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('users')
        .select('gender', db.raw('COUNT(users.id) as users'))
        .groupBy('gender')
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.dashboardAgeGraphDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('users')
        .select(db.raw("DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),users.DOB)), '%Y')+0 AS age"), db.raw('COUNT(users.id) as users'))
        .whereNotNull('DOB')
        .groupBy('age')
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.dashboardPaymentDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('paymentType')
        .select('paymentType.id', 'type', db.raw('COUNT(orders.id) as orders'))
        .leftJoin('orders', 'paymentType.id', '=', 'orders.paymentId')
        .groupBy('paymentType.id')
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }


  this.dashboardLatestCustomerFeedback = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('rating')
        .select('id', 'driverRating', 'productRating', 'commemts')
        .orderBy('id', 'desc')
        .limit(5)
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.dashboardAppFeedbackDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('appFeedback')
        .select('id', 'apps', 'commemts', 'rating')
        .orderBy('id', 'desc')
        .limit(5)
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.adminNotificationDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('adminNotification')
        .select('adminNotification.id', 'firstName', 'drId', 'cars.carID', 'carModel', 'carImage', 'type', 'textMessage')
        .leftJoin('driver','adminNotification.driverId', '=', 'driver.id')
        .leftJoin('cars','adminNotification.carId', '=', 'cars.id')
        .orderBy('adminNotification.id', 'desc')
        .limit(5)
        .then((result) => {
          console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }


  this.dashboardOrderDao = (data) => {
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
        .select('orders.id', 'orderIDs', 'orders.userId', 'customerID', 'as_driverId', 'drId', 'grandTotal', 'orderStatus', db.raw('DATE_FORMAT(orderOn, "%d/%m/%Y") AS orderOn'), db.raw('TIME_FORMAT(orderOn, "%r") AS time'))
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .leftJoin('driver', 'orders.as_driverId', '=', 'driver.id')
        // .leftJoin('driverOrders', 'orders.as_driverId', '=', 'driverOrders.driverId')
        .groupBy('orders.id')
        .orderBy('orders.id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
        })
        .then((result) => {
          // console.log(result)
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

  this.driverListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .select('driver.id', 'driver.carId', 'dob', 'drId', 'carModel', 'firstName', 'lastName', 'email', 'profilePic', 'mobileNumber', 'gender')
        .leftJoin('cars', 'driver.carId', '=', 'cars.id')
        .where('isDeleteDriver', 0)
        .orderBy('driver.id', 'desc')
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

  this.dashboardStoreRevenue = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
         .select('orderId')
         .where('storeId', data.id)
         .groupBy('orderId')
        .then((result) => {
          // console.log(result)
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

  this.dashboardStoreRevenueTotal = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
      .select(db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
         .where('storeId', data.id)
        //  .sum('price as amt')
        //  .groupBy('orderId')
        .then((result) => {
          // console.log(result)
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

  this.topOrderUserDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('users')
        .select('users.id','customerID', 'firstName', 'lastName', db.raw('COUNT(orders.userId) as orders'))
        .leftJoin('orders', 'users.id', '=', 'orders.userId')
        .groupBy('users.id')
        .orderBy('orders', 'desc')
        .limit(5)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.topOrderDriverDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('driver')
        .select('driver.id','drId', 'firstName', 'lastName', db.raw('COUNT(driverOrders.driverId) as orders'), 'profilePic')
        .leftJoin('driverOrders', 'driver.id', '=', 'driverOrders.driverId')
        .groupBy('driver.id')
        .orderBy('orders', 'desc')
        .limit(5)
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.topOrderStoreDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('orderItems')
        .select('orderId')
        .where('orderItems.storeId', data.id)
        .groupBy('orderId')
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.heatMapDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('users_address')
        .select('users_address.id', 'addressType', 'addressPinDetails', 'landmark', 'latitude', 'longitude', db.raw('COUNT(orders.addressId) as orders'))
        .innerJoin('orders', 'users_address.id', '=', 'orders.addressId')
        .groupBy('users_address.id')
        .orderBy('orders', 'desc')
        .limit(10)
        .modify(function (queryBuilder) {
          if (data.fromDate && data.toDate) {
            queryBuilder.whereRaw('DATE(orders.orderOn) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
          }
          if (data.fromDate && data.toDate == '') {
            queryBuilder.whereRaw('DATE(orders.orderOn) = ?', [data.fromDate])
          }
        })
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  this.topSellingItemDao = (data) => {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('orderItems')
        .select('orderItems.productId', 'productName', db.raw("SUM(quantity) as qty"))
        .innerJoin('product', 'orderItems.productId', '=', 'product.id')
        .groupBy('orderItems.productId')
        .orderBy('qty', 'desc')
        .modify(function (queryBuilder) {
          if (data.fromDate && data.toDate) {
            queryBuilder.whereRaw('DATE(orderItems.createdAt) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
          }
          if (data.fromDate && data.toDate == '') {
            queryBuilder.whereRaw('DATE(orderItems.createdAt) = ?', [data.fromDate])
          }
        })
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

}
