module.exports = function () {
  const db = require('../../db.js')

  this.searchOrderIds = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .select('orders.id','orders.as_driverId', 'firstName', 'userId', 'orderItems.storeId')
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('orderItems', 'orders.id', '=', 'orderItems.orderId')
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .whereRaw('( orderIDs LIKE  "%' + id + '%" )')
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

  this.saveSupportDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('support')
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

  this.saveSupportNewDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('support')
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

  this.saveSupportCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('supportCategory')
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

  this.getSupportCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('supportCategory')
        .select('id','categoryName')
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

  this.updateSupportStatusDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('support')
      .where('id', data.id)
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

  this.getSupportListDao = (data) => {
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
      db('support')
        .select('support.id','support.appUser','support.category', 'driver.id as dr_id', 'supportID', 'users.firstName', 'driver.firstName as driverName', 'drId', 'customerID', 'orders.orderIDs', 'support.orderId', 'status', 'notes', 'as_driverId', 'support.userId', db.raw('DATE_FORMAT(support.createdAt, "%d/%m/%Y") AS createdDate'), db.raw('TIME_FORMAT(support.createdAt, "%r") AS time'))
        .innerJoin('orders', 'support.orderId', 'orders.id')
        .leftJoin('driver', 'orders.as_driverId', 'driver.id')
        .innerJoin('users', 'support.userId', 'users.id')
        .orderBy('support.id', 'desc')
        .modify(function (queryBuilder) {
          if (data.category !== 'ALL') {
            queryBuilder.where('support.category', data.category)
          }
          if (data.queryType === 'LIST' && data.category === 'ALL'){
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          if (data.status != 'NONE') {
            queryBuilder.where('status', data.status)
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

  this.supportStatusCountDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.raw("SELECT (SELECT COUNT(*) FROM support ) AS total, (SELECT COUNT(*) FROM support WHERE  status= 'PROGRESS' ) AS pending, (SELECT COUNT(*) FROM support WHERE  status= 'ESCALATE' ) AS escalate, (SELECT COUNT(*) FROM support WHERE  status= 'RESOLVED' ) AS resolved")
        .then((result) => {
          // console.log(result)
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

  this.getAppFeedbackListDao = (data) => {
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
      db('appFeedback')
        .select('appFeedback.id', 'apps', 'commemts', 'customerID', db.raw('DATE_FORMAT(appFeedback.createdAt, "%d/%m/%Y") AS createdDate'))
        .innerJoin('users', 'appFeedback.userId', '=', 'users.id')
        .orderBy('appFeedback.id', 'desc')
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

  this.getUserSearchListDao = (data) => {
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
      db('userSearch')
        .select('userSearch.id', 'type', 'firstName', 'lastName', 'customerID', 'mobileNumber', 'lat', 'lng', 'searchText', db.raw('DATE_FORMAT(userSearch.createdAt, "%d/%m/%Y") AS createdDate'))
        .leftJoin('users', 'userSearch.userId', '=', 'users.id')
        .orderBy('userSearch.id', 'desc')
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

  this.getUserFeedbackListDao = (data) => {
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
      db('rating')
        .select('rating.id', 'driver.id as drIds', 'appRating', 'drId', 'orderIDs', 'orderId', 'customerID','rating.userId', 'driverRating', 'productRating', 'commemts', db.raw('DATE_FORMAT(rating.createdAt, "%d/%m/%Y") AS createdDate'))
        .innerJoin('users', 'rating.userId', '=', 'users.id')
        .innerJoin('orders', 'rating.orderId', '=', 'orders.id')
        .innerJoin('driver', 'orders.as_driverId', '=', 'driver.id')
        .orderBy('rating.id', 'desc')
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

  this.getDriverFeedbackListDao = (data) => {
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
      db('driverFeedback')
        .select('driverFeedback.id', 'driver.id as drIds', 'findLocation', 'drId', 'orderIDs', 'orderId', 'customerID','driverFeedback.userId', 'notes', db.raw('DATE_FORMAT(driverFeedback.createdAt, "%d/%m/%Y") AS createdDate'))
        .innerJoin('users', 'driverFeedback.userId', '=', 'users.id')
        .innerJoin('orders', 'driverFeedback.orderId', '=', 'orders.id')
        .innerJoin('driver', 'orders.as_driverId', '=', 'driver.id')
        .orderBy('driverFeedback.id', 'desc')
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


  this.getunavailableProductDao = (data) => {
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
      db('unavailableProduct')
        .select('unavailableProduct.id', 'unavailableProduct.userId', 'firstName', 'mobileNumber', 'unavailableProduct.latitude', 'unavailableProduct.longitude', 'customerID', 'address', db.raw('DATE_FORMAT(unavailableProduct.createdAt, "%d/%m/%Y") AS createdDate'))
        .leftJoin('users', 'unavailableProduct.userId', '=', 'users.id')
        .orderBy('unavailableProduct.id', 'desc')
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

}

