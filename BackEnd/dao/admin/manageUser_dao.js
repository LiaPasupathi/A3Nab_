module.exports = function () {
  const db = require('../../db.js')

  this.totalAllUserDao = (data, id) => {
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
      db('users')
        .select('users.id', 'customerID', 'firstName', 'lastName', 'email', 'countryCode', 'mobileNumber', 'os', 'profilePic', 'DOB', 'gender', db.raw('DATE_FORMAT(users.createdAt, "%d/%m/%Y") AS signupDate'), db.raw('TIME_FORMAT(users.createdAt, "%r") AS signupDateTime'), db.raw('DATE_FORMAT(users.lastOrder, "%d/%m/%Y") AS lastOrder'), db.raw('TIME_FORMAT(users.lastOrder, "%r") AS lastOrdertime'), db.raw('COUNT(orders.userId) as orders'), db.raw('COALESCE(SUM(grandTotal),0) as amount'), 'walletAmount', 'packageValue', 'trustUser', 'userStatus')
        // .leftJoin('users_address', 'users.id', '=', 'users_address.userId')
        // .groupBy('users.id', 'addressPinDetails')
        .leftJoin('orders', 'users.id', '=', 'orders.userId')
        // .leftJoin('orderItems', 'orders.id', '=', 'orderItems.orderId')
        .orderBy('id', 'desc')
        .groupBy('orders.userId', 'users.id')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST' && data.limit == '0') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          if (data.methodType === 'ONE') {
            queryBuilder.where('users.id', id)
          }
          if(data.signupDate){
            queryBuilder.whereRaw('DATE(users.createdAt) = ?', [data.signupDate])
          }
          if(data.text){
            queryBuilder.whereRaw('( firstName LIKE  "%' + data.text + '%" OR mobileNumber LIKE  "%' + data.text + '%" )')
          }
          if(data.limit != '0'){
            queryBuilder.limit(data.limit)
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

  this.userViewOrderDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .select('orders.id', 'orderIDs', 'orders.userId', 'customerID', 'firstName', 'lastName', 'mobileNumber', 'addressType', 'addressPinDetails', 'landmark', 'instruction', 'users_address.latitude', 'users_address.longitude', 'buildingName', 'addressId', 'timeId', 'timeText', 'paymentType.type as paytype', 'paymentId', 'orderStatus', 'orderProgress', 'totalAmount', 'discountAmount', 'grandTotal', 'couponDiscount', 'couponDiscountPer', 'totalQuantity', 'fastDelivery', db.raw('DATE_FORMAT(orderOn, "%d/%m/%Y") AS orderOn'), db.raw('DATE_FORMAT(deliveryOn, "%d/%m/%Y") AS deliveryOn'), db.raw('DATE_FORMAT(deliveryDate, "%d/%m/%Y") AS deliveryDate'))
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
        .where('orders.userId', data.id)
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

  this.adminupdateProfileUserDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
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

  this.findUserAddress = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users_address')
        .where({ userId: data })
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
