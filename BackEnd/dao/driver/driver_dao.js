module.exports = function () {
  const db = require('../../db.js')

  this.getDriverDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .select('id', 'firstName', 'lastName', 'email', 'countryCode', 'mobileNumber')
        .where({ mobileNumber: data.mobileNumber, 'isDeleteDriver': 0 })
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

  this.getDriverDetailByIdDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .select('driver.id', 'firstName', 'lastName', 'email', 'isAccepted', 'gender', db.raw('DATE_FORMAT(dob, "%Y-%m-%d") AS dob'), 'countryCode', 'mobileNumber', 'driver.carId as ucarId', 'cars.carID', 'carModel', 'licenseNumber', 'lastDateOilChange', 'lastDateGasRefill', 'expirationDate', 'currentMileage', 'driverActive', 'documentA', 'documentB', 'driverLicence')
        .leftJoin('cars', 'driver.carId', '=', 'cars.id')
        .where({ 'driver.id': data.id, 'isDeleteDriver': 0 })
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

  this.carDamageListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('carDamages')
        .select('id', 'DamageReason')
        // .where({ 'carId': data.carId })
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

  this.currentAssignmentDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverOrders')
        .select('driverOrders.id', 'assignDate')
        .where({ 'driverId': data.id, isComplete: 0 })
        .orderBy('driverOrders.id', 'desc')
        .limit(1)
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

  this.newCarAssignDao = (data, type) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .select('driver.id', 'firstName', 'cars.carID', 'carModel', 'licenseNumber', 'IDNumber', 'currentMileage', 'startingMileage', 'expirationDate', 'lastDateOilChange')
        .leftJoin('cars', 'driver.carId', '=','cars.id' )
        .where({ 'driver.id': data.id, 'returnCar': 0})
        .whereNotNull('driver.carId')
        .modify(function (queryBuilder) {
          if(type === 'NEW'){
            queryBuilder.where('isAccepted', 0)
            queryBuilder.where('newCar', 1)
          } else {
            queryBuilder.where('isAccepted', 1)
            queryBuilder.where('newCar', 0)
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


  this.checkDriverUpdateEmailMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.raw('select * from driver where ( email=? OR  mobileNumber=? ) AND id != ?', [data.email, data.mobileNumber, data.id])
        .then((result) => {
          response.error = false
          response.data = result[0]
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateDriverProfileUserDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .where({ id: data.id })
        .update(data)
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

  this.removeDriverIdFromcar = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cars')
        .where('id', data.id)
        .update(data)
        .then((result) => {
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

  this.maintenanceListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('maintenanceList')
        // .where({ id: data.id })
        // .update(data)
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

  this.addMaintenanceDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverMaintenance')
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


  this.addMaintenanceNotificationDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('adminNotification')
        .insert({ carId: data.carId, driverId: data.driverId, maintenanceId: data.maintenanceId, type:'maintenance', textMessage: data.message })
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

  this.addReturnNotificationDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('adminNotification')
        .insert({ carId: data.carId, driverId: data.id, type:'returnCar' })
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

  this.addReturnCarDao = (data, damageList) => {
    return new Promise(async function (resolve) {
      var response = {}
      return db.transaction(function (t) {
        return db('returnCar')
          .transacting(t)
          .insert({ carId: data.carId, driverId: data.id, carMileage: data.carMileage })
          .then(function (response) {
            return Promise.all(damageList.map((item) => {
              return db('carDamages')
              .transacting(t)
              .insert({ returnId: response[0],  DamageReason: item, carId: data.carId, driverId: data.id, addedBy: 'DRIVER', carMileage: data.carMileage })
            }))
          })
          .then(t.commit)
          .catch(t.rollback)
      })
      .then(function (result) {
        response.error = false
        resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        response.error = true
        resolve(response)
      })
      // db('carDamages')
      //   .insert(data)
      //   .then((result) => {
      //     response.error = false
      //     response.result = result
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     response.error = true
      //   })
      //   .finally(() => {
      //     resolve(response)
      //   })
    })
  }

  this.findUserRouteDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverrRoute')
        .select('driverrRoute.id', 'driverrRoute.storeId', 'storeName', 'sortOrder','countryCode', 'mobileNumber', 'latitude', 'longitude')
        .innerJoin('store', 'driverrRoute.storeId', '=', 'store.id')
        .where({'routeId': data.routeId, type: 'STORE'})
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

  this.findUserRouteOrdersDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.id as routeId', 'orderId')
        // .innerJoin('store', 'driverrRoute.storeId', '=', 'store.id')
        .where({'routeId': data.routeId})
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

  this.getDeliveryStoreDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select('orderItems.storeId', 'storeName', 'storeImage', 'store.storeID')
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .where('orderItems.orderId', id)
        .groupBy('orderItems.storeId')
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
  this.viewfindUserStoreDao = (id, orderIds, routeId) => {
    return new Promise(async function (resolve) {
      // console.log(routeId)
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.userId as u_id', 'orderId', 'paymentId', 'orderOn', 'deliveryDate', 'addressPinDetails', 'storeId', 'firstName', 'customerID', 'mobileNumber', 'countryCode', 'receipt')
        .innerJoin('users', 'deliveryUsers.userId', '=', 'users.id')
        .innerJoin('orders', 'deliveryUsers.orderId', '=', 'orders.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        // .where({'isPickUp':0 })
        // .whereRaw('(receipt IS NULL OR isPickUp = 0) AND deliveryUsers.storeId = ?',[id])
        .where('routeId', routeId)
        // .whereIn('deliveryUsers.orderId', orderIds)
        // .where('deliveryUsers.storeId', id)
        // .whereNull('receipt')
        // .groupBy('orderItems.u_id')
        
        .then((result) => {

          var filteredArr = result
            var filteredArrDis = filteredArr.reduce((acc, current) => {
              const x = acc.find(item => item.orderId === current.orderId);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);

            // console.log(filteredArrDis)

          // console.log(result)
          response.error = false
          response.data = filteredArrDis
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

  this.findUserStoreDao = (id, orderIds, routeId) => {
    return new Promise(async function (resolve) {
      // console.log(routeId)
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.userId as u_id', 'orderId', 'paymentId', 'paymentType.type as payType', 'orderOn', 'ordertax', 'totalAmount', 'discountAmount', 'grandTotal', 'deliveryDate', 'addressPinDetails', 'storeId', 'firstName', 'customerID', 'mobileNumber', 'countryCode', 'receipt')
        .innerJoin('users', 'deliveryUsers.userId', '=', 'users.id')
        .innerJoin('orders', 'deliveryUsers.orderId', '=', 'orders.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        // .where({'isPickUp':0 })
        .whereRaw('(receipt IS NULL OR isPickUp = 0) AND deliveryUsers.storeId = ?',[id])
        .where('routeId', routeId)
        // .whereIn('deliveryUsers.orderId', orderIds)
        // .where('deliveryUsers.storeId', id)
        // .whereNull('receipt')
        // .groupBy('orderItems.u_id')
        
        .then((result) => {

          var filteredArr = result
            var filteredArrDis = filteredArr.reduce((acc, current) => {
              const x = acc.find(item => item.orderId === current.orderId);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);

            // console.log(filteredArrDis)

          // console.log(result)
          response.error = false
          response.data = filteredArrDis
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

  this.findOrderProductsDao = (id,stId, routeId) => {
    return new Promise(async function (resolve) {
      var response = {}

      db('deliveryUsers')
        .select('deliveryUsers.id', 'deliveryUsers.storeId', 'deliveryUsers.orderId', 'deliveryUsers.productId', 'productName', 'specialInstructions', 'quantity', 'price', 'userId', 'isPickUp', 'receipt', 'supplyPrice  as totalPrice', 'deliveryUsers.discount', db.raw('SUM(deliveryUsers.price  - ( deliveryUsers.price  * ( deliveryUsers.discount/100))) as singlePrice'))
        // .innerJoin('orderItems', 'deliveryUsers.orderId', '=', 'orderItems.orderId')
        .innerJoin('product', 'deliveryUsers.productId', '=', 'product.id')
        .where({'routeId': routeId, 'deliveryUsers.storeId': stId, 'deliveryUsers.userId': id})
        .groupBy('deliveryUsers.id', 'deliveryUsers.orderId')
      // db('orderItems')
      //   .select('orderItems.id', 'orderId', 'productId', 'productName', 'quantity', 'price', 'supplyPrice  as totalPrice', 'orderItems.discount', db.raw('SUM(orderItems.price  - ( orderItems.price  * ( orderItems.discount/100))) as singlePrice'))
      //   .innerJoin('product', 'orderItems.productId', '=', 'product.id')
      //   .where('u_id', id)
      //   .where('orderItems.storeId', stId)
      //   .groupBy('orderItems.id')
        // .groupBy('orderId')
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

  this.getDliveryNotesDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('makeDelivery')
        .select('id', 'deliveryNotes', 'createdAt')
        .where('userId', id)
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

  this.findrouteOrderDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select('id', 'orderId', 'productId')
        // .innerJoin('product', 'orderItems.productId', '=', 'product.id')
        .whereIn('orderId', id)
        // .groupBy('orderItems.u_id')
        // .groupBy('orderId')
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

  this.checkDriverRouteDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverOrders')
        .select('driverOrders.id', 'driver.latitude', 'driver.longitude', 'orders', 'pickupCount', 'dropCount', 'assignDate', 'isComplete')
        .innerJoin('driver', 'driverOrders.driverId', '=', 'driver.id')
        .where({'driverOrders.id': data.routeId})
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

  this.getuserOrderRoutesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverrRoute')
        .select('driverrRoute.id', 'driverrRoute.userId', 'paymentType.type as payType', 'orderId', 'orderOn', 'ordertax', 'totalAmount', 'discountAmount', 'grandTotal', 'deliveryDate', 'addressPinDetails', 'users_address.latitude', 'users_address.longitude', 'firstName', 'customerID', 'sortOrder', 'mobileNumber', 'countryCode', 'receipt')
        .innerJoin('users', 'driverrRoute.userId', '=', 'users.id')
        .innerJoin('orders', 'driverrRoute.orderId', '=', 'orders.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .where({'routeId': data.routeId, 'driverrRoute.type': 'ORDER', 'makeDelivery': 0 })
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


  this.routeGroupStoreDao = (userId, routeId) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.storeId', 'storeName', 'mobileNumber', 'latitude','longitude')
        .innerJoin('store', 'deliveryUsers.storeId', '=', 'store.id')
        .where({'routeId': routeId, 'userId': userId})
        .groupBy('deliveryUsers.storeId')
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

  this.storeUserRouteOrderListDao = (storeId, routeId, userId) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.id', 'deliveryUsers.storeId', 'userId', 'isPickUp', 'specialInstructions', 'receipt', 'deliveryUsers.orderId', 'deliveryUsers.productId', 'productName', 'quantity', 'price', 'supplyPrice  as totalPrice', 'deliveryUsers.discount', 'specialInstructions', db.raw('SUM(deliveryUsers.price  - ( deliveryUsers.price  * ( deliveryUsers.discount/100))) as singlePrice'))
        // .innerJoin('orderItems', 'deliveryUsers.orderId', '=', 'orderItems.orderId')
        .innerJoin('product', 'deliveryUsers.productId', '=', 'product.id')
        .where({'routeId': routeId, 'deliveryUsers.storeId': storeId, 'deliveryUsers.userId': userId})
        .groupBy('deliveryUsers.id', 'deliveryUsers.orderId')
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

  this.storeUserOrderListDao = (userId, routeId) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.id', 'storeId', 'orderId')
        // .innerJoin('store', 'deliveryUsers.storeId', '=', 'store.id')
        .where({'routeId': routeId, storeId: userId})
        .groupBy('deliveryUsers.storeId')
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

  this.driverupdateOrderStatuDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .where({'id': data.id })
        .update(data)
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

  this.driverupdateOrdeReceiptDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .where({'userId': data.userId, storeId: data.storeId, routeId: data.routeId })
        .update('receipt', data.receipt)
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

  this.productImagesDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_image')
      .select('id', 'productImage')
        .where({'productId': id })
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

  this.findDeliveryRouteDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverrRoute')
      .select('id', 'sortOrder')
        .where({'routeId': data.routeId })
        .orderBy('sortOrder', 'desc')
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

  this.updateRouteOrderDao = (id, order) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverrRoute')
        .where({'id': id })
        .update('sortOrder', order)
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

  this.getDriverAssignmentDao = (id, type) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('driverOrders')
        .select('id', 'assignDate')
        .where({'driverId': id })
        .modify(function (queryBuilder) {
          if(type == 'Completed'){
            queryBuilder.where('isComplete', 1)
          } else if(type == 'Current') {
            queryBuilder.where('isComplete', 0)
            queryBuilder.orderBy('id', 'asc')
            queryBuilder.limit(1)
          } else if(type == 'UpComing') {
            queryBuilder.where('isComplete', 0)
            queryBuilder.offset(1)
            queryBuilder.orderBy('id', 'asc')
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

  this.driverViewOrderDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
       .select('orders.id','orderIDs', 'firstName', 'mobileNumber', 'orderOn', 'deliveryOn', 'paymentType.type', 'fromTime', 'toTime', 'deliveryDate', 'grandTotal', 'orderStatus', 'addressPinDetails', 'users_address.latitude', 'users_address.longitude', 'buildingName')
       .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
       .innerJoin('users', 'orders.userId', '=', 'users.id')
       .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
       .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
        .where({'orders.id': data.orderId })
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

  this.getDeliveryStoreDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.storeId', 'storeName')
        .innerJoin('store', 'deliveryUsers.storeId', '=', 'store.id')
        .where({'routeId': data.routeId, 'orderId': data.orderId })
        .groupBy('deliveryUsers.storeId')
        // .update('sortOrder', order)
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

  this.getDriverProductDao = (storeId, data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryUsers')
        .select('deliveryUsers.id', 'deliveryUsers.storeId', 'userId', 'isPickUp', 'specialInstructions', 'receipt', 'deliveryUsers.orderId', 'deliveryUsers.productId', 'productName', 'quantity', 'price', 'supplyPrice  as totalPrice', 'deliveryUsers.discount', 'specialInstructions', db.raw('SUM(deliveryUsers.price  - ( deliveryUsers.price  * ( deliveryUsers.discount/100))) as singlePrice'))
        // .innerJoin('orderItems', 'deliveryUsers.orderId', '=', 'orderItems.orderId')
        .innerJoin('product', 'deliveryUsers.productId', '=', 'product.id')
        .where({'routeId': data.routeId, 'deliveryUsers.storeId': storeId, 'deliveryUsers.orderId': data.orderId})
        .groupBy('deliveryUsers.id', 'deliveryUsers.orderId')
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

  this.updateMakeDelivery = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      return db.transaction(function (t) {
        return db('driverrRoute')
          .transacting(t)
          .where({ 'orderId': data.orderId, userId: data.userId, routeId: data.routeId })
          .update('makeDelivery', 1)
          .then(function (response) {
            return db('orders').where('id', data.orderId).update('orderStatus', 'COMPLETED')
            .transacting(t)
            .then(function (response) {
              return db('driverFeedback').insert({ orderId: data.orderId, userId: data.userId, routeId: data.routeId, findLocation: data.findLocation, notes: data.notes, FdriverId: data.id })
              .transacting(t)
            })
          })
          .then(t.commit)
          .catch(t.rollback)
      })
      .then(function (result) {
        response.error = false
        resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        response.error = true
        resolve(response)
      })
    })
  }

  this.updateDriverFloatingCashDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      return db.transaction(function (t) {
        return db('driverFloatingCash')
          .transacting(t)
          .insert({ driverId: data.id, orderId: data.orderId, cashType: 'ORDER', amount: data.amount  })
          .then(function (response) {
            return db('driver').where('id', data.id).increment({ floatingCash: data.amount })
            .transacting(t)
          })
          .then(t.commit)
          .catch(t.rollback)
      })
      .then(function (result) {
        response.error = false
        resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        response.error = true
        resolve(response)
      })
    })
  }

  this.updateDeliveryNotesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('makeDelivery')
        .insert({ orderId: data.orderId, userId: data.userId, deliveryNotes: data.notes })
        .then((result) => {
          // console.log(result)                                                                                                                                                                                                                  
          response.error = 'false'
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateDeliveryNotesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .where('id', data.orderId)
        .update('delievryNotes', data.notes)
        .then((result) => {
          // console.log(result)                                                                                                                                                                                                                  
          response.error = 'false'
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.checkDeliveryCount = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverrRoute')
      .where({ 'type': 'ORDER', routeId: data.routeId, makeDelivery: 0 })
        .then((result) => {
          // console.log(result)
          response.error = 'false'
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.finalDeliveryCallDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverOrders')
      .where({ id: data.routeId })
      .update('isComplete', 1)
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

  this.getDriverNotificationDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('notificationList')
       .where({ driverId: data.id })
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
