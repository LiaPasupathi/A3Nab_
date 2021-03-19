module.exports = function () {
  const db = require('../../db.js')

  this.exportUserListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.users == 'true') {
        db('users')
          .select('users.id', 'customerID', 'firstName', 'lastName', 'email', 'countryCode', 'mobileNumber', 'os', db.raw('DATE_FORMAT(users.DOB, "%d/%m/%Y") AS DOB'), 'gender', db.raw('DATE_FORMAT(users.createdAt, "%d/%m/%Y") AS signupDate'), db.raw('TIME_FORMAT(users.createdAt, "%r") AS signupDateTime'), db.raw('DATE_FORMAT(users.lastOrder, "%d/%m/%Y") AS lastOrder'), 'walletAmount', 'packageValue', 'trustUser', 'userStatus')
          .orderBy('id', 'desc')
          .then((result) => {
            response.error = false
            response.data = result
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.exportStoreListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.store == 'true') {
        db('store')
          .select('id', 'storeID', 'email', 'mobileNumber', 'storeName', 'storeImage', 'storeAddress', 'managerFname', 'latitude', 'longitude', 'storeRadius', 'managerLname', 'status', 'isComingSoon', db.raw('DATE_FORMAT(createdAt, "%d/%m/%Y") AS createdDate'), db.raw('TIME_FORMAT(createdAt, "%r") AS time'))
          .where('isStoreDelete', 0)
          .orderBy('id', 'desc')
          .then((result) => {
            response.error = false
            response.data = result
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.exportDriverListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.driver == 'true') {
        db('driver')
          .select('driver.id', 'driver.carId', 'dob', 'isAccepted', 'drId', 'carModel', 'firstName', 'lastName', 'email', 'profilePic', 'countryCode', 'mobileNumber', 'gender', 'IDNumber', 'latitude', 'longitude', 'driverActive')
          .leftJoin('cars', 'driver.carId', '=', 'cars.id')
          .where('isDeleteDriver', 0)
          .orderBy('driver.id', 'desc')
          .then((result) => {
            response.error = false
            response.data = result
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.exportProductListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.product == 'true') {
        db('product')
          .select('product.id', 'productCode', 'productName', 'product.arabicName', 'categoryName', 'productCategoryName', 'productSubCategoryName', 'qty', 'maxQty', 'product.productPrice', 'productDiscount', 'specialInstructions', 'product.isComingSoon', 'product.managerPrice')
          .innerJoin('category', 'product.categoryId', '=', 'category.id')
          .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
          .leftJoin('product_sub_category', 'product.productSubCategoryId', '=', 'product_sub_category.id')
          .where('product.isDelete', 0)
          .orderBy('product.id', 'desc')
          .then((result) => {
            response.error = false
            response.data = result
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.exportCarListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.cars == 'true') {
        db('cars')
          .select('cars.id', 'cars.carID', 'carModel', 'licenseNumber', 'lastDateOilChange', 'lastDateGasRefill', db.raw('DATE_FORMAT(expirationDate, "%d/%m/%Y") AS expirationDate'), 'currentMileage', 'startingMileage')
          // .leftJoin('cars', 'driver.carId', '=', 'cars.id')
          .where('deleteStatus', 0)
          .orderBy('cars.id', 'desc')
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
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.exportVendorListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.vendor == 'true') {
        db('vendor')
          .select('vendor.id', 'vendorName', 'store.storeID', 'storeName')
          .innerJoin('store', 'vendor.storeId', '=', 'store.id')
          .orderBy('vendor.id', 'desc')
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
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.exportSupportListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.support == 'true') {
        db('support')
          .select('support.id', 'supportID', 'orderIDs', 'customerID', 'firstName', 'status', 'notes', db.raw('DATE_FORMAT(support.createdAt, "%d/%m/%Y") AS createdAt'))
          .innerJoin('orders', 'support.orderId', '=', 'orders.id')
          .innerJoin('users', 'support.userId', '=', 'users.id')
          .orderBy('support.id', 'desc')
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
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.exportOrdersListDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      if (data.orders == 'true') {
        db('orders')
          .select('orders.id', 'orderIDs', 'customerID', 'firstName', 'addressPinDetails', 'fromTime', 'toTime', 'orderStatus', db.raw('DATE_FORMAT(orderOn, "%d/%m/%Y") AS orderOn'), db.raw('DATE_FORMAT(deliveryDate, "%d/%m/%Y") AS deliveryDate'), 'fastDelivery', 'totalQuantity', 'totalAmount', 'discountAmount', 'grandTotal')
          .innerJoin('users_address', 'orders.addressId', '=', 'orders.id')
          .innerJoin('users', 'orders.userId', '=', 'users.id')
          .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
          .orderBy('orders.id', 'desc')
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
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

}
