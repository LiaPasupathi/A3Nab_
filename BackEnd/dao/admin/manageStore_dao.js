module.exports = function () {
  const db = require('../../db.js')

  this.getAllStoreDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('store')
        .select('id', 'storeName', 'storeImage', 'storeID', 'storeName as itemName')
        .where('isStoreDelete', 0)
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

  this.totalAllStoreDao = (data) => {
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
      db('store')
        .select('id', 'storeID', 'email', 'mobileNumber', 'storeName', 'storeImage', 'storeAddress', 'managerFname', 'latitude', 'longitude', 'storeRadius', 'managerLname', 'status', 'isComingSoon', db.raw('DATE_FORMAT(createdAt, "%d/%m/%Y") AS createdDate'), db.raw('TIME_FORMAT(createdAt, "%r") AS time'))
        .where('isStoreDelete', 0)
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

  this.checkStoreEmailDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('store')
        .orWhere('email', data.email)
        .orWhere('mobileNumber', data.mobileNumber)
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

  this.saveNewStoreDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('store')
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

  this.updateStoreProfileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('store')
        .where('id', data.id)
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

  this.uploadStoreBillingCyleDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('billingCyle')
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

  this.editStoreEmailMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.raw('select * from store where ( email=? OR  mobileNumber=? ) AND id != ?', [data.email, data.mobileNumber, data.id])
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

  this.findStoreCategory = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('category')
        .select('id', 'categoryName', 'storeId', 'categoryStatus')
        .where('storeId', id)
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

  this.adminViewStoreDetailDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('store')
        .where('id', data.storeId)
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

  this.checkStoreManMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
        .where('mobileNumber', data.mobileNumber)
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

  this.editcheckStoreManMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
        .where('mobileNumber', data.mobileNumber)
        .where('id','!=', data.id)
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

  this.updateStoreManagerDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
        .where('id', data.id)
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

  this.saveNewStoreManagerDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
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

  this.getStoreManagerDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
        .select('id', 'firstName', 'lastName', 'email', 'storeId', 'mobileNumber', 'post', 'dob', 'gender', 'status')
        .where('storeId', data.storeId)
        .where('status', 'active')
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

  this.overAllRevunueDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      // console.log(data)
      db('orderItems')
        .select(db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
        .where({'orderItems.storeId': data.storeId })
        .whereIn('orderItems.storeStatus', ['ACCEPTED', 'PICKUP', 'ONGOING'])
        // .modify(function (queryBuilder) {
        //   if (data.fromDate && data.toDate) {
        //     queryBuilder.whereRaw('DATE(orderItems.createdAt) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
        //   }
        //   if (data.fromDate && data.toDate == '') {
        //     queryBuilder.whereRaw('DATE(orderItems.createdAt) = ?', [data.fromDate])
        //   }
        // })
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

  this.getStoreRevenueDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      // console.log(data)
      db('orderItems')
        .select( db.raw('YEAR(createdAt) year'), db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
        .where({'orderItems.storeId': data.storeId })
        .whereIn('orderItems.storeStatus', ['ACCEPTED', 'PICKUP', 'ONGOING'])
        .groupBy('year')
        .modify(function (queryBuilder) {
          if (data.fromDate && data.toDate) {
            queryBuilder.whereRaw('DATE(orderItems.createdAt) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
          }
          if (data.fromDate && data.toDate == '') {
            queryBuilder.whereRaw('DATE(orderItems.createdAt) = ?', [data.fromDate])
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

  // this.getStoteDueAmountDao = (data, isPaid) => {
  //   return new Promise(async function (resolve) {
  //     var response = {}
  //     // db.raw("SELECT SUM(supplyPrice) as tot FROM `orderItems` WHERE storeId = 2 AND isPaid = 0 AND (createdAt BETWEEN ? AND ?)", [data.fromDate, data.toDate])
  //     db('orderItems')
  //       .select('isPaid','orderItems.storeId',  db.raw('YEAR(createdAt) as year'), db.raw('MONTH(createdAt) as month'), db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
  //       .where({'orderItems.storeId': data.storeId })
  //       .whereRaw('DATE(createdAt) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
  //       .where('isPaid', isPaid)
  //       // .whereIn('orderItems.storeStatus', ['ACCEPTED', 'PICKUP', 'ONGOING'])
  //       .groupBy('storeId', 'isPaid', 'month', 'year')
  //       .then((result) => {
  //         // console.log(result[0])
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

  this.getStoteDueAmountDao = (data, isPaid) => {
    return new Promise(async function (resolve) {
      var response = {}
      // db.raw("SELECT SUM(supplyPrice) as tot FROM `orderItems` WHERE storeId = 2 AND isPaid = 0 AND (createdAt BETWEEN ? AND ?)", [data.fromDate, data.toDate])
      db('orderItems')
        .select('isPaid','orderItems.storeId',  db.raw('YEAR(createdAt) as year'), db.raw('MONTH(createdAt) as month'), db.raw('COALESCE(SUM(supplyPrice),0) as amount'))
        .where({'orderItems.storeId': data.storeId })
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


  this.storeOrdergraphCount = (type, year, storeId) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select('orderItems.orderId')
        .where({'orderItems.storeId': storeId })
        .whereIn('orderItems.storeStatus', ['ACCEPTED', 'PICKUP', 'ONGOING'])
        .groupBy('orderId')
        .modify(function (queryBuilder) {
          if(type === 'YEAR'){
            queryBuilder.whereRaw('YEAR(createdAt) = ?', [year])
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

  this.getStoreStockProductDao = (data) => {
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
      db('vendorProducts')
        .select('vendorProducts.id', 'productName', 'vendorName', 'stockType', 'productStatus', 'units', 'productCategoryName', db.raw('DATE_FORMAT(expiryDate, "%d/%m/%Y") AS expiryDate'), 'StockReason', 'vendorProducts.createdAt')
        .innerJoin('vendor', 'vendorProducts.vendorId', '=', 'vendor.id')
        .innerJoin('product', 'vendorProducts.productId', '=', 'product.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where({'vendorProducts.storeId': data.storeId})
        .orderBy('vendorProducts.id', 'desc')
        .modify(function (queryBuilder) {
          if (data.queryType === 'LIST') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          // if (data.status == 'STOCK') {
          //   queryBuilder.where('units', '!=', 0)
          // }
          // if (data.status == 'OUT') {
          //   queryBuilder.where('units', '=', 0)
          // }
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

  this.storProductListDao = (data) => {
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
      db('storeProducts')
        .select('storeProducts.id', 'productName', 'product.categoryId', 'storeProducts.storeId', 'storeProducts.productId', 'productStatus', 'productCategoryName', 'storeProducts.productPrice', 'storeStock', 'productStatus', db.raw('COUNT(orderItems.productId) as sold'))
        .innerJoin('product', 'storeProducts.productId', '=', 'product.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('orderItems', 'storeProducts.productId', '=', 'orderItems.productId')
        // .innerJoin('orderItems', 'storeProducts.storeId', '=', 'orderItems.storeId')
        .where('storeProducts.storeId', data.storeId)
        .where('orderItems.storeId', data.storeId)
        .groupBy('orderItems.storeId', 'storeProducts.id')
        .modify(function (queryBuilder) {
          if(data.categoryId){
            queryBuilder.where('product.categoryId', data.categoryId)
          }
          if(!data.limit){
            if (data.queryType === 'LIST') {
              queryBuilder.offset(pageOffset).limit(data.pageCount)
            }
          } else {
            queryBuilder.limit(data.limit)
          }

          if(data.status == 'STOCK'){
            queryBuilder.where('storeStock', '!=', 0)
          }
          if(data.status == 'OUT'){
            queryBuilder.where('storeStock', '=', 0)
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

  this.checkStoreSoldCount = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .where({'orderItems.storeId': data.storeId, 'productId': data.productId})
        .count('id as sold')
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

  this.storOrderListDao = (data) => {
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
      db('orderItems')
        .select('orders.id', 'orderIDs', 'customerID', 'paymentType.type as paytype', 'orderStatus', 'grandTotal', db.raw('DATE_FORMAT(orderOn, "%d/%m/%Y") AS orderOn'), db.raw('SUM(supplyPrice) as totalPrice'), db.raw('SUM(price) as price'))
        // .innerJoin('product', 'orderItems.productId', '=', 'product.id')
        .innerJoin('orders', 'orderItems.orderId', '=', 'orders.id')
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        // ,innerJoin('orders', 'orderItems.orderId', '=', 'orders.id')
        // .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where('orderItems.storeId', data.storeId)
        .groupBy('orderItems.orderId')
        .orderBy('orders.id', 'desc')
        .modify(function (queryBuilder) {
          if (!data.limit) {
            if (data.queryType === 'LIST') {
              queryBuilder.offset(pageOffset).limit(data.pageCount)
            }
          } else {
            queryBuilder.limit(data.limit)
          }
          

          if (data.fromDate && data.toDate) {
            queryBuilder.whereRaw('DATE(orders.orderOn) BETWEEN ? AND ? ', [data.fromDate, data.toDate])
          }
          if (data.fromDate && data.toDate == '') {
            queryBuilder.whereRaw('DATE(orderOn) = ?', [data.fromDate])
          }
          // if (data.fromDate && data.toDate) {
          //   queryBuilder.offset(pageOffset).limit(data.pageCount)
          // }
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
