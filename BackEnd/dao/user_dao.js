module.exports = function () {
  var mysqlExecute = require('../connection.js')
  const db = require('../db.js')
  var async = require('async')


  this.getUserloginDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
        .select('id', 'firstName', 'lastName', 'email', 'otp', 'latitude', 'longitude', 'countryCode', 'mobileNumber', 'profilePic')
        .where({ mobileNumber: data.mobileNumber, countryCode: data.countryCode, 'userStatus': 'active' })
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

  this.getUserDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
        .select('id', 'firstName', 'lastName', 'email', 'otp', 'latitude', 'longitude', 'countryCode', 'mobileNumber', 'profilePic')
        .where({ mobileNumber: data.mobileNumber, countryCode: data.countryCode })
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

  this.createUserDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
        .insert(data)
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

  this.getUserDetailsFromNameDao = (name) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = 'SELECT id,name,password,email,loginType,countryCode,mobileNumber FROM patients WHERE name = ?'
        var queryRequest = [name]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        output.error = 'true'
        output.message = 'OOPS DAO Exception'
        resolve(output)
      }
    })
  }

  this.getOfferDetailsDao = () => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('offers')
        .whereRaw('DATE(startDate) <= ?', [db.raw('DATE(now())')])
        .whereRaw('DATE(endDate) >= ?', [db.raw('DATE(now())')])
        .where('status', 'active')
        .orderBy('id', 'desc')
        .limit(5)
        .then((result) => {
          // console.log(result)
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  this.getUserHomeCategoryDao = (ids) => {
    return new Promise(async function (resolve, reject) {
      // console.log(ids)
      var response = {}
      db('category')
        .where('categoryStatus', 'active')
        .where('isDelete', 0)
        .whereIn('category.id', ids)
        .orderBy('categoryName', 'desc')
        // .limit(5)
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

  this.getUserCategoryDao = () => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('category')
        .where('categoryStatus', 'active')
        .where('isDelete', 0)
        .orderBy('categoryName', 'desc')
        // .limit(5)
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

  this.bestProductsDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('product')
        .select('product.id', 'productName', 'storeRadius', 'storeStock', 'product.arabicName', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'minOrderTime as sub_processingMin', 'qty as productWeight', 'maxQty', 'storeProducts.productPrice', 'storeProducts.storeId', 'productDiscount', 'productStatus', 'productDiscountStatus', 'storeProductStatus', 'instructionsStatus', db.raw('ST_Distance_Sphere(point(store.longitude, store.latitude), point(' + data.lng + ', ' + data.lat + ')) / 1000 AS distance'))
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where('productStatus', 'active')
        .where({ 'store.status': 'active', 'isStoreDelete': 0, 'isBestProduct' : 1, 'storeProductStatus': 'active' })
        .where('product.isDelete', 0)
        // .whereIn('store.id', data.stIds)
        // .having('distance', '<', data.radius)
        // .where(data)
        // .whereRaw('( productName LIKE  "%' + object.name + '%" )')
        .orderBy('distance', 'asc')
        .then((result) => {
          // console.log(result.length)

          if(result.length > 0){
            var arrayFilter = result.filter(function (element) {
              return element.distance < (element.storeRadius)
            })
            var filteredArr = arrayFilter
            var filteredArrDis = filteredArr.reduce((acc, current) => {
              const x = acc.find(item => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            // console.log(filteredArrDis)
            response.error = false
            response.data = filteredArrDis
          } else {
            response.error = false
            response.data = result         
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  this.getAllOfferDetailsDao = () => {
    return new Promise(async function (resolve) {
      var response = {}
      db('offers')
        .whereRaw('DATE(startDate) <= ?', [db.raw('DATE(now())')])
        .whereRaw('DATE(endDate) >= ?', [db.raw('DATE(now())')])
        .where('status', 'active')
        .orderBy('id', 'desc')
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

  this.searchAddsUserDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('offers')
        .whereRaw('DATE(startDate) <= ?', [db.raw('DATE(now())')])
        .whereRaw('DATE(endDate) >= ?', [db.raw('DATE(now())')])
        .where('status', 'active')
        .whereRaw('( title LIKE  "%' + data.title + '%" )')
        .orderBy('id', 'desc')
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

  this.deleteUserDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = 'DELETE FROM users WHERE id = ?'
        var queryRequest = [data.id]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.deleteAllddressesDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = 'DELETE FROM users_address WHERE userId = ?'
        var queryRequest = [data.id]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        output.error = 'true'
        output.message = 'OOPS DAO Exception'
        resolve(output)
      }
    })
  }

  this.getAddressDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users_address')
        .where('userId', data.id)
        .where('type','ADDRESS')
        .where('isDeleteAdd', 1)
        .orderBy('id', 'desc')
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

  this.configurationsDao = () => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT * FROM configurations WHERE status = 'active'"
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.configurationsUnauthDao = () => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT * FROM configurations WHERE status = 'active' AND id IN (1,2)"
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.storeListDao = () => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT id,storeName,storeImage,status,isComingSoon,isSuperMarket,createdAt,updatedAt FROM store WHERE status = 'active'"
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.categoryListDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT id,categoryName,categoryImage,orderProcessing,minimum,createdAt,updatedAt FROM category WHERE storeId = ? AND categoryStatus = 'active'"
        var queryRequest = [data.storeId]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.productCategoryListDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT id,productCategoryName,productCategoryImage,createdAt,updatedAt FROM product_category WHERE categoryId = ? AND productCategoryStatus = 'active'"
        var queryRequest = [data.categoryId]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.getBestProductDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT product.id,product.productName,product.productStatus,product.createdAt,product.updatedAt,qty as productWeight,product.productPrice,product.productDiscount, product.productDiscountStatus , product.instruction, product.isBestProduct FROM product INNER JOIN product_category ON(product.productCategoryId = product_category.id) WHERE product_category.categoryId = ? AND product.productStatus = 'active'"
        var queryRequest = [data.categoryId]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.productSubCategoryListDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT id,productSubCategoryName,productSubCategoryImage,createdAt,updatedAt FROM product_sub_category WHERE productCategoryId = ? AND productSubCategoryStatus = 'active'"
        var queryRequest = [data.categoryId]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.productListDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = "SELECT product.id,productName,qty as productWeight,productPrice,productDiscount,productDiscountStatus,instruction,product.createdAt,product.updatedAt FROM product WHERE productCategoryId = ? AND productStatus = 'active'"
        var queryRequest = [data.productCategoryId]
        var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.productImagesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_image')
        .select('id', 'productImage', 'productId', 'productImageStatus')
        .where({ productId: data.productId, productImageStatus: 'active' })
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

  this.findCuttingStyleDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cuttingStyle')
        .select('id', 'cuttingName', 'arabicName', 'cuttingPrice')
        .where({ productId: data.productId })
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

  this.findBoxStyleDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('boxStyle')
        .select('id', 'boxName', 'boxPrice', 'arabicName')
        .where({ productId: data.productId })
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

  this.homeSearchUserDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('category')
        .where({ categoryStatus: 'active' })
        .whereRaw('( categoryName LIKE  "%' + data.name + '%" )')
        .whereIn('id', data.ids)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = 'false'
          response.result = result
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

  this.productCategorySearchDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_category')
        .select('id', 'productCategoryName', 'arabicName', 'productCategoryImage', 'isSubcate', 'categoryId')
        .where({ categoryId: data.categoryId, productCategoryStatus: 'active' })
        .whereRaw('( productCategoryName LIKE  "%' + data.name + '%" )')
        .orderBy('id', 'desc')
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

  this.productSearchDao = (data, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('product.id', 'productName', 'storeRadius', 'storeProductStatus', 'storeStock', 'product.arabicName', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'minOrderTime as sub_processingMin', 'qty as productWeight', 'maxQty', 'storeProducts.productPrice', 'storeProducts.storeId', 'productDiscount', 'productDiscountStatus', 'instructionsStatus', db.raw('ST_Distance_Sphere(point(store.longitude, store.latitude), point(' + object.lng + ', ' + object.lat + ')) / 1000 AS distance'))
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where('productStatus', 'active')
        .where({ 'store.status': 'active', 'isStoreDelete': 0, 'product.isDelete': 0, 'storeProductStatus': 'active'})
        // .where('product.isDelete', 0)
        .where(data)
        .whereRaw('( productName LIKE  "%' + object.name + '%" )')
        // .whereIn('store.id', object.stIds)
        // .having('distance', '<', object.radius)
        .orderBy('distance', 'asc')
        .then((result) => {
          
          if(result.length > 0){
            var arrayFilter = result.filter(function (element) {
              return element.distance < (element.storeRadius)
            })
            var filteredArr = arrayFilter

            var filteredArr = result.reduce((acc, current) => {
              const x = acc.find(item => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            response.error = 'false'
            response.result = filteredArr
          } else {
            response.error = 'false'
            response.result = result         
          }

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

  this.getBestProductDao = (data) => {
    var output = {}
    return new Promise(async function (resolve) {
      var output = {}
      try {
        var mysqlExecuteCall = new mysqlExecute()
        var query = 'select * from product where isBestProduct = 1'
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
        if (queryResponse.error == 'false') {
          resolve(queryResponse)
        } else {
          resolve(queryResponse)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS DAO Exception'
        resolve(err)
      }
    })
  }

  this.checkUpdateEmailMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.raw('select * from users where ( email=? OR  mobileNumber=? ) AND id != ?', [data.email, data.mobileNumber, data.id])
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

  this.updateProfileUserDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
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
  

  this.updateDeviceTokenDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
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

  this.addAddressesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users_address')
        .insert({ userId: data.id, addressType: data.addressType, addressPinDetails: data.addressPinDetails, landmark: data.landmark, instruction: data.instruction, latitude: data.latitude, longitude: data.longitude, buildingName: data.buildingName })
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

  this.addCurrAddressesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users_address')
        .insert({ userId: data.id, type: data.type, addressType: data.addressType, addressPinDetails: data.addressPinDetails, landmark: data.landmark, instruction: data.instruction, latitude: data.latitude, longitude: data.longitude, buildingName: data.buildingName })
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

  this.updateAddressesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users_address')
        .where({ userId: data.addressId })
        .update({ addressType: data.addressType, addressPinDetails: data.addressPinDetails, landmark: data.landmark, instruction: data.instruction, latitude: data.latitude, longitude: data.longitude, buildingName: data.buildingName })
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

  this.checkCurrentAddressDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users_address')
        .where({ userId: data.id, type: 'CURRENT' })
        // .update('isDeleteAdd', 0)
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

  this.deleteAddressesDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users_address')
        .where({ id: data.addressId })
        .update('isDeleteAdd', 0)
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

  /**********************************************************************************/

  this.getProductUserCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_category')
        .where({ categoryId: data.categoryId, productCategoryStatus: 'active', isDelete: 0 })
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

  this.getProductSubCategoryDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product_sub_category')
        .where({ productCategoryId: data.id, productSubCategoryStatus: 'active', isDelete: 0 })
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

  this.getHomeCategoryProductListtDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('storeProducts.id', 'storeProducts.categoryIds', 'storeProducts.productId', 'storeRadius', 'storeProductStatus', 'qty as productWeight', 'maxQty', 'storeProducts.storeId', db.raw('ST_Distance_Sphere(point(store.longitude, store.latitude), point(' + data.lng + ', ' + data.lat + ')) / 1000 AS distance'))
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        // .innerJoin('category', 'product.categoryId', '=', 'category.id')
        // .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where('productStatus', 'active')
        .where({ 'store.status': 'active', 'isStoreDelete': 0, 'storeProductStatus': 'active' })
        .where('isDelete', 0)
        // .whereIn('store.id', data.stIds)
        // .having('distance', '<', data.radius)
        // .where(object)
        .orderBy('distance', 'asc')
        .then((result) => {
          if(result.length > 0){
            var ids = []
            var arrayFilter = result.filter(function (element) {
              return element.distance < (element.storeRadius)
            })
            var filteredArr = arrayFilter
            var filteredArrdis = filteredArr.reduce((acc, current) => {
              const x = acc.find(item => item.categoryIds === current.categoryIds);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
              async.each(filteredArrdis, async function (item) {
              ids.push(item.categoryIds)
            })
            response.error = false
            response.data = ids
          } else {
            response.error = false
            response.data = result
          }
          
        })
        .catch((result) => {
          console.log(result)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getBestDistanceProductListtDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('storeProducts.id', 'storeProducts.productId', 'storeRadius', 'storeProductStatus', 'qty as productWeight', 'maxQty', 'storeProducts.storeId', db.raw('ST_Distance_Sphere(point(store.longitude, store.latitude), point(' + data.lng + ', ' + data.lat + ')) / 1000 AS distance'))
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        // .innerJoin('category', 'product.categoryId', '=', 'category.id')
        // .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where('productStatus', 'active')
        .where({ 'store.status': 'active', 'isStoreDelete': 0, 'isBestProduct' : 1, 'storeProductStatus': 'active' })
        .where('isDelete', 0)
        // .whereIn('store.id', data.stIds)
        // .having('distance', '<', data.radius)
        // .where(object)
        .orderBy('distance', 'asc')
        .then((result) => {
          if(result.length > 0){
            var ids = []
            var arrayFilter = result.filter(function (element) {
              return element.distance < (element.storeRadius)
            })
            var filteredArr = arrayFilter
            var filteredArrdis = filteredArr.reduce((acc, current) => {
              const x = acc.find(item => item.productId === current.productId);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
              async.each(filteredArrdis, async function (item) {
              ids.push(item.id)
            })
            response.error = false
            response.data = ids
          } else {
            response.error = false
            response.data = result
          }
          
        })
        .catch((result) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getUserBestProductDao = (data) => {
    return new Promise(async function (resolve) {
      // isBestProduct: 1,
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
      db('product')
        .select('product.id', 'product.categoryId','product.arabicName', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'minOrderTime as sub_processingMin', 'qty as productWeight', 'maxQty', 'product.productCategoryId', 'product.productSubCategoryId', 'storeProducts.storeId', 'storeStock', 'product.productName', 'product.productStatus', 'qty as productWeight', 'storeProducts.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where('productStatus', 'active')
        .where('store.status', 'active')
        .where('product.isDelete', 0)
        .where('isBestProduct', 1)
        .where('storeProductStatus', 'active')
        // .whereIn('store.id', data.stIds)
        .whereIn('storeProducts.id', data.productIds)
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
  this.getDistanceProductListtDao = (data, object) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('product')
        .select('storeProducts.id', 'storeProducts.productId', 'storeProductStatus', 'storeRadius', 'storeProducts.storeId', db.raw('ST_Distance_Sphere(point(store.longitude, store.latitude), point(' + data.lng + ', ' + data.lat + ')) / 1000 AS distance'))
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .where('productStatus', 'active')
        .where('isDelete', 0)
        .where({ 'store.status': 'active', 'isStoreDelete': 0, 'storeProductStatus': 'active' })
        // .having('distance', '<', data.radius)
        // .whereIn('store.id', data.stIds)
        .where(object)
        .orderBy('distance', 'asc')
        .then((result) => {
          // console.log(result)
          if(result.length > 0){
            var ids = []
            var arrayFilter = result.filter(function (element) {
              return element.distance < (element.storeRadius)
            })
            var filteredArr = arrayFilter
            var filteredArrDis = filteredArr.reduce((acc, current) => {
              const x = acc.find(item => item.productId === current.productId);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
              async.each(filteredArrDis, async function (item) {
              ids.push(item.id)
            })
            response.error = false
            response.data = ids
          } else {
            response.error = false
            response.data = result
          }
          
        })
        .catch((result) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getProductListtDao = (data, object) => {
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
      // var lat = 13.08270
      // var lng = 80.27070

      // db('product')
      //   .select('product.id', db.raw('ST_Distance_Sphere(point(longitude, latitude), point(' + lng + ', ' + lat + ')) / 1000 AS distance'), 'product.categoryId', 'product.productCategoryId', 'product.productSubCategoryId', 'product.storeId', 'product.productName', 'product.productStatus', 'product.productWeight', 'product.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
      //   .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
      db('product')
        .select('product.id', 'storeProducts.id as std', 'product.categoryId', 'product.arabicName', 'minimum as cate_minimum', 'cate_processingMin', 'category.orderProcessing as cate_orderProcessing', 'minimumOrderValue as sub_minimum', 'product_category.orderProcessing as sub_orderProcessing', 'minOrderTime as sub_processingMin', 'product.productCategoryId', 'product.productSubCategoryId', 'storeProducts.storeId', 'storeStock', 'product.productName', 'product.productStatus', 'qty as productWeight', 'maxQty', 'storeProducts.productPrice', 'product.productDiscount', 'product.productDiscountStatus', 'product.productDescription', 'product.isBestProduct', 'product.orderVariants', 'product.specialInstructions', 'product.instructionsStatus', 'product.differentPriceVariant', 'product.status', 'product.createdAt', 'product.updatedAt')
        .innerJoin('storeProducts', 'product.id', '=', 'storeProducts.productId')
        .innerJoin('store', 'storeProducts.storeId', '=', 'store.id')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .where('productStatus', 'active')
        .where('product.isDelete', 0)
        .where({ 'store.status': 'active', 'isStoreDelete': 0, 'storeProductStatus': 'active' })
        // .whereIn('store.id', data.stIds)
        .whereIn('storeProducts.id', data.productIds)
        .where(object)
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
        .catch((result) => {
          // console.log(result)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getUserProfileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
        .select('users.id', 'firstName', 'lastName', 'email', 'countryCode', 'mobileNumber', 'profilePic', db.raw('DATE_FORMAT(DOB, "%Y-%m-%d") AS DOB'), 'gender', 'walletAmount', 'referralCode', db.raw('COUNT(orders.userId) as orders'), 'packageValue', 'trustUser', 'offersNotify', 'ordersNotify', 'announcementNotify', 'othersNotify')
        .leftJoin('orders', 'users.id', '=', 'orders.userId')
        .groupBy('users.id')
        .where({ 'users.id': data.id })
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

  this.checkReferralUserId = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
        .select('id', 'mobileNumber', 'walletAmount')
        .where({ referralCode: data.referralCode })
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

  this.addReferralDetails = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('referralDetails')
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

  this.updateWalletAmountDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
        .where('id', data.referFrom)
        .increment({ walletAmount: data.amount })
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

  this.updateUserWalletAmount = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('users')
        .where('id', data.id)
        .decrement({ walletAmount: data.amount })
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

  this.updateWalletTransactionAmountDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('walletTransaction')
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

  this.updateUserOfferValueDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      return db.transaction(function (t) {
        return db('userCouponCode')
          .transacting(t)
          .insert(data)
          .then(function (response) {
            return db('offers').where('id', data.couponId).decrement({ count: 1 })
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

  this.saveappFeedbackDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('appFeedback')
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

  this.getUserRatingListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      if(data.userId){
        db('orders')
         .select('id')
        .where({ userId: data.userId, isRate: 0, orderStatus: 'COMPLETED' })
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
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.getUpdateAddressListDao = (data) => {
    console.log(data.currentAddress)
    return new Promise(async function (resolve) {
      var response = {}
      if(data.userId){
        db('users')
        .where({ id: data.id })
        .update("currentAddress", data.currentAddress)
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
      } else {
        response.error = false
        response.data = []
        resolve(response)
      }
    })
  }

  this.unavailableProductDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
        db('unavailableProduct')
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

  this.getWalletHistoryDao = (data) => {
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
        db('walletTransaction')
         .where({ userId : data.id, transactionType: 'WALLET'})
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

  this.getUserfaqDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
        db('faq')
         .where('type', 'CUSTOMER')
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

  this.getUserDeviceToken = (id, type) => {
    return new Promise(async function (resolve) {
      var response = {}
        db('users')
        .select('id', 'fcmToken')
        .where('id', id)
        .whereNotNull('fcmToken')
        .modify(function (queryBuilder) {
          if(type == 'ORDERS'){
            queryBuilder.where('ordersNotify', 'true')
          }
         })
        .then((result) => {
          if(result.length > 0){
            response.error = false
            response.data = result
          } else {
            response.error = true
          }
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getAdminNotifyManageDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
        db('notificationSettings')
        .where('id', id)
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

  this.getStoreManagerTokenDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
        db('orderItems')
        .select('orderItems.storeId', 'fcmToken')
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .innerJoin('storemanager', 'orderItems.storeId', '=', 'storemanager.storeId')
        .where('orderId', id)
        .whereNotNull('fcmToken')
        .groupBy('orderItems.storeId', 'fcmToken')
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

  this.getDriverFcmToken = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
        db('driver')
        .select('id', 'fcmToken')
        .where('id', id)
        .whereNotNull('fcmToken')
        .then((result) => {
          if(result.length > 0){
            response.error = false
            response.data = result
          } else {
            response.error = true
          }
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
