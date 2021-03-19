module.exports = function () {
  var async = require('async')
  var productDao = require('../dao/products_dao')
  var userDao = require('../dao/user_dao')
  var notification = require('./user_notification_service')
  require('../utils/common.js')

  this.addFavouriteProductService = async (request, callback) => {
    var response = {}
    try {
      var productObject = new productDao()
      if (request.isFavourite == 'true') {
        var result = await productObject.saveFavProductDao(request)
        response.message = 'add favourite product successfuly'
      } else {
        var result = await productObject.delFavProductDao(request)
        // response.message = 'login success'
        response.message = 'remove favourite product successfuly'
      }
      if (result.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.userAddCartService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var productObject = new productDao()
      var cart = await productObject.checkMyCartProduct(request)
      if (cart.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if (cart.data.length > 0) {
          var proQuantity = cart.data[0].quantity
          request.cartId = cart.data[0].id
          if (request.key == 0 && proQuantity == 1) {
            await productObject.removeCartDao(request)
            var mycart = await this.myCartDetails(request.id)

            resp.cartCount = mycart.cartCount
            resp.cartAmount = mycart.cartAmount
            resp.discountAmount = mycart.discountAmount
            resp.quantity = 0

            response.error = 'false'
            response.message = 'success'
            response.data = resp
            callback(response)
            return
          }
          if (request.key == 1) {
            request.quantity = parseInt(proQuantity) + 1
          } else {
            request.quantity = parseInt(proQuantity) - 1
          }
          var result = await productObject.updateMycartDao(request)
        } else {
          if (request.key == 1) {
            var result = await productObject.addMycartDao(request)
            request.quantity = 1
          } else {
            var mycart = await this.myCartDetails(request.id)
            resp.cartCount = mycart.cartCount
            resp.cartAmount = mycart.cartAmount
            resp.discountAmount = mycart.discountAmount
            resp.quantity = 0

            response.error = 'false'
            response.message = 'success'
            response.data = resp
            callback(response)
            return
          }
        }
        if (result.error) {
          response.error = 'true'
          response.message = 'failed to retrive store details'
        } else {
          var mycart = await this.myCartDetails(request.id)
          resp.cartCount = mycart.cartCount
          resp.cartAmount = mycart.cartAmount
          resp.discountAmount = mycart.discountAmount
          resp.quantity = request.quantity

          response.error = 'false'
          response.message = 'success'
          response.data = resp
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.myCartDetails = function (userId) {
    return new Promise(async function (resolve) {
      var response = {}
      var trustUser = {}
      var productObject = new productDao()
      var userDaoObject = new userDao()
      trustUser.id = userId
      var user = await userDaoObject.getUserProfileDao(trustUser)
      var mycart = await productObject.getMyCardItems(userId)
      var cart = await productObject.getCardItems(userId, mycart.data)
      if (cart.error || user.error) {
        response.error = true
        resolve(response)
      } else {
        var cartItems = cart.data
        trustUser.isTrustUser = user.data[0].trustUser
        trustUser.packageValue = user.data[0].packageValue
        if (cartItems.length > 0) {
          var totalSum = await productObject.cartTotalSumValue(userId)
          if (totalSum.error) {
            response.error = true
            resolve(response)
          } else {
            var length = cartItems.length
            async.eachOfSeries(cartItems, async function (item, index) {
              var storePrice = await productObject.findStorePriceDao(item)
              cartItems[index].productPrice = storePrice.data[0].productPrice
              cartItems[index].storeStock = storePrice.data[0].storeStock
                // console.log(storePrice)

              if(--length===0){
                response.error = false
                response.cart = cartItems
                response.cartCount = cartItems.length
                response.discountAmount = totalSum.data[0].discountPrice
                response.cartAmount = totalSum.data[0].totalPrice
                response.originalPrice = totalSum.data[0].originalPrice
                response.trustUser = trustUser
                resolve(response)
              }
            })
          }
        } else {
          response.error = false
          response.cart = cartItems
          response.cartCount = 0
          response.cartAmount = 0
          response.discountAmount = 0
          response.originalPrice = 0
          response.trustUser = trustUser
          resolve(response)
        }
      }
      // resolve(response)
    })
  }

  this.viewCartService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()
      var appSettings = await productDaoObject.productAppSettings()
      var cartResult = await this.myCartDetails(request.id)
      if (cartResult.error || appSettings.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
        callback(response)
      } else {
        if (cartResult.cart.length > 0) {
          var products = cartResult.cart
          var length = products.length
          async.eachOfSeries(products, async function (item, index) {
            var req = {
              productId: item.productId,
              userId: request.id
            }
            products[index].isFavourite = 'false'
            var checkFav = await productDaoObject.checkUserFavProduct(req)
            var productImagesDao = await userDaoObject.productImagesDao(req)
            // var produdctVariant = await productDaoObject.getProdudctVariantDao(req)
            if (checkFav.data.length > 0) {
              products[index].isFavourite = 'true'
            }
            products[index].productImages = productImagesDao.result
            // products[index].variants = produdctVariant.data

            if (--length === 0) {
              resp.settings = appSettings.data[0]
              resp.totalAmount = cartResult.cartAmount
              resp.discountAmount = cartResult.discountAmount
              resp.trustUser = cartResult.trustUser
              resp.myCart = products

              response.error = 'false'
              response.message = 'success'
              response.data = resp
              callback(response)
            }
          })
        } else {
          resp.settings = appSettings.data[0]
          resp.myCart = cartResult.cart
          resp.totalAmount = cartResult.cartAmount
          resp.discountAmount = cartResult.discountAmount
          resp.trustUser = cartResult.trustUser
          response.error = 'false'
          response.message = 'success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.deleteCartService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var productObject = new productDao()
      var result = await productObject.removeCartDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        var mycart = await this.myCartDetails(request.id)
        if (mycart.error) {
          response.error = 'true'
          response.message = 'failed to retrive store details'
        } else {
          resp.cartCount = mycart.cartCount
          resp.cartAmount = mycart.cartAmount
          resp.discountAmount = mycart.discountAmount

          response.error = 'false'
          response.message = 'success'
          response.data = resp
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.viewFavListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()
      request.queryType = 'TOTAL'
      var totalResult = await productDaoObject.userFavProductDao(request)
      if (totalResult.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (totalResult.data.length > 0) {
          request.pageCount = 10
          request.queryType = 'LIST'

          var total = totalResult.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
          request.queryType = 'LIST'
          var result = await productDaoObject.userFavProductDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            var products = result.data
            var length = products.length
            if (length > 0) {
              async.eachOfSeries(products, async function (item, index) {
                products[index].isFavourite = 'false'
                products[index].quantity = 0

                request.userId = request.id
                request.id = request.id
                request.productId = item.id
                var checkFav = await productDaoObject.checkUserFavProduct(request)
                var checkCartCount = await productDaoObject.checkMyCartProduct(request)

                if (checkCartCount.data.length > 0) {
                  products[index].quantity = checkCartCount.data[0].quantity
                }
                if (checkFav.data.length > 0) {
                  products[index].isFavourite = 'true'
                }

                var productImagesDao = await userDaoObject.productImagesDao(request)
                var produdctVariant = await productDaoObject.getProdudctVariantDao(request)
                products[index].variants = produdctVariant.data

                products[index].productImages = productImagesDao.result
                if (--length === 0) {
                  resp.pages = total
                  resp.products = products

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.pages = total
              resp.products = result.data

              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.pages = 0
          resp.products = totalResult.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.getPaymentListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var productDaoObject = new productDao()
      var payment = await productDaoObject.getPaymentDao()
      if (payment.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        resp.list = payment.data

        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.getDeliveryTimeService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var productDaoObject = new productDao()
      var payment = await productDaoObject.getDeliveryTimeDao(request)
      if (payment.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        resp.list = payment.data

        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.reOrderService = async (request, callback) => {
    var response = {}
    try {
      var productDaoObject = new productDao()
      var userDaoObject = new userDao()
      var cartResult = await this.reOrerCartDetails(request.orderId)
      if (cartResult.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (cartResult.cart.length > 0) {
          var cartItemsList = cartResult.cart
          var arrayFilter = cartItemsList.filter(function (element) {
            return element.storeStock < (element.quantity)
          })
          if(arrayFilter.length === 0){
            var couponDiscount = 0
            var couponDiscountPer = 0
            request.grandTotal = cartResult.cartAmount
            if (request.couponCode) {
              var couponCodeResult = await this.couponCodeService(request, cartItemsList)
              if (couponCodeResult.error == 'true') {
                callback(couponCodeResult)
                return
              }
              couponDiscount = couponCodeResult.discountVal
              couponDiscountPer = couponCodeResult.discount
            }
  
            var val = Math.floor(1000 + Math.random() * 9000)
  
            var productObject = {}
            productObject.userId = request.id
            productObject.orderIDs = '#Ord' + val
            productObject.addressId = request.addressId
            productObject.timeId = request.deliveryTimeId
            productObject.isPlaced = 1
            productObject.deliveryDate = request.deliveryDate
            productObject.paymentId = request.paymentId
            productObject.orderOn = new Date()
            productObject.totalAmount = cartResult.originalPrice
            productObject.discountAmount = cartResult.discountAmount
            productObject.grandTotal = cartResult.cartAmount - couponDiscount
            productObject.couponDiscount = couponDiscount
            productObject.couponDiscountPer = couponDiscountPer
            productObject.fastDelivery = request.fastDelivery
            // productObject.fastDelivery = request.fastDelivery
            productObject.deleteItems = request.deleteItems
            // console.log(productObject)
            // return;

            if(request.isWallet === 'true'){
              var walletCheck =  await this.checkUserWallet(request)
              // console.log('l')
              if(walletCheck.error === 'true'){
                callback(walletCheck)
                return
              }
              if(walletCheck.isPaidvalue === 1){
                productObject.grandTotal = walletCheck.payAmount
                productObject.paidByWallet = walletCheck.transAmount
              }
              
            }
  
            if(request.isTrustUser === 'true'){
              var isTrustUserCheck =  await this.checkisTrustUser(productObject)
              if(isTrustUserCheck.error === 'true'){
                callback(walletCheck)
                return
              }
              productObject.trustTrans = isTrustUserCheck.transAmount
              productObject.trustUserOrder = 1
              // console.log(isTrustUserCheck)
            }
            var taxCal = (request.ordertax / 100) *  productObject.grandTotal
            productObject.grandTotal = productObject.grandTotal + taxCal
            productObject.ordertax = taxCal
            productObject.taxValue = request.ordertax
  
            var saveOrder = await productDaoObject.saveOrdersDao(productObject)
            if (saveOrder.error) {
              response.error = 'true'
              response.message = 'fetch failed'
              callback(response)
            } else {
              var cartList = cartResult.cart
              var length = cartList.length
              var totalOty = 0
              async.each(cartList, async function (item) {
                var itemObject = {}
                itemObject.orderId = saveOrder.data[0]
                itemObject.u_id = request.id
                itemObject.productId = item.productId
                itemObject.quantity = item.quantity
                itemObject.storeId = item.storeId
                itemObject.price = item.productPrice
                itemObject.discount = item.productDiscount
                itemObject.supplyPrice = item.totalPrice
                itemObject.cuttingStyleId = item.cuttingStyleId
                itemObject.boxStyleId = item.boxStyleId
                if(item.specialInstructions){
                  itemObject.orderInstructions = item.orderInstructions
                }
                await productDaoObject.saveOrderItems(itemObject)
                await productDaoObject.updateStoreStockCount(itemObject)
  
                totalOty += item.quantity
  
                if (--length === 0) {
                  if(request.isWallet === 'true'){
                    if(walletCheck.error === 'false'){
                      if(walletCheck.isPaidvalue === 1){
                      request.amount = walletCheck.transAmount
                      await userDaoObject.updateUserWalletAmount(request)
  
                      var walletObject = {}
                      walletObject.userId = request.id
                      walletObject.orderId = saveOrder.data[0]
                      walletObject.transactionType = 'ORDER'
                      walletObject.amount = walletCheck.transAmount
                      walletObject.typeOfTrans = 'DEBIT'
                      await userDaoObject.updateWalletTransactionAmountDao(walletObject)
                      }
                    }
                  }

                  if (request.couponCode) {
                    if (couponCodeResult.error == 'false') {
                      var offerObj = {}
                      offerObj.userId = request.id
                      offerObj.couponId = couponCodeResult.couponId
                      offerObj.discountValue = couponCodeResult.discountVal
                      offerObj.orderId = saveOrder.data[0]
                      // console.log(offerObj)
                      await userDaoObject.updateUserOfferValueDao(offerObj)
                    }
                  }
  
                  if(request.isTrustUser === 'true'){
                    if(isTrustUserCheck.error === 'false'){
                      var trObject = {}
                      trObject.id = request.id
                      trObject.packageValue = isTrustUserCheck.walletBalance
                     await userDaoObject.updateProfileUserDao(trObject)
                    }
                  }
                  
                  await productDaoObject.removeUserCartDao(request.id)
                  await productDaoObject.updateProductQty(totalOty, saveOrder.data[0])
                  response.error = 'false'
                  response.message = 'Success'
                  callback(response)
                }
              })
            }
          } else {
            response.error = 'true'
            response.message = 'Your ordered product is out of stock'
            callback(response)
          }

          
        } else {
          response.error = 'true'
          response.message = 'Cart empty'
          callback(response)
        }
      }
    } catch(e){
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.reOrerCartDetails = function (orderId) {
    return new Promise(async function (resolve) {
      var response = {}
      var productObject = new productDao()
      var cart = await productObject.getReorderItems(orderId)
      if (cart.error) {
        response.error = true
      } else {
        var cartItems = cart.data
        if (cartItems.length > 0) {
          var totalSum = await productObject.reOrderTotalSumValue(orderId)
          if (totalSum.error) {
            response.error = true
          } else {
            response.error = false
            response.cart = cartItems
            response.cartCount = cartItems.length
            response.discountAmount = totalSum.data[0].discountPrice
            response.cartAmount = totalSum.data[0].totalPrice
            response.originalPrice = totalSum.data[0].originalPrice
          }
        } else {
          response.error = false
          response.cart = cartItems
          response.cartCount = 0
          response.cartAmount = 0
          response.discountAmount = 0
          response.originalPrice = 0
        }
      }
      resolve(response)
    })
  }

  this.checkCouponCodeService = async (request, callback) => {
    try {
      var response = {}
      var couponCodeResult = await this.couponCodeService(request)
      if(couponCodeResult.error == 'true'){
        response.error = 'true'
        response.message = 'Invalid coupon code'
      } else {
        response.error = 'false'
        response.message = 'coupon code verified successfully'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.placeOrderService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      // var notificationObj = {}
      // notificationObj.userId = request.id
      // notificationObj.notifyType = 'PLACEORDER'
      // notificationObj.orderId = 1

      // var notificationObject = new notification()
      // notificationObject.sendOrderNotification(notificationObj, 'ORDERS', () => {})
      // return;
      // var result = (request.ordertax / 100) * 200;
      // console.log(result)
      // console.log(request)
      // return;
      var notificationObject = new notification()
      var productDaoObject = new productDao()
      var userDaoObject = new userDao()
      var cartResult = await this.myCartDetails(request.id)
      if (cartResult.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (cartResult.cart.length > 0) {
          var cartItemsList = cartResult.cart
          var arrayFilter = cartItemsList.filter(function (element) {
            return element.storeStock < (element.quantity)
          })
          if(arrayFilter.length  === 0){
            var couponDiscount = 0
            var couponDiscountPer = 0
            request.grandTotal = cartResult.cartAmount
            if (request.couponCode) {
              var couponCodeResult = await this.couponCodeService(request, cartItemsList)
              // console.log(couponCodeResult)
              if (couponCodeResult.error == 'true') {
                callback(couponCodeResult)
                return
              }
              couponDiscount = couponCodeResult.discountVal
              couponDiscountPer = couponCodeResult.discount
            }
  
            var val = Math.floor(1000 + Math.random() * 9000)
            var isPaid = 0
            if(request.paymentId == '1'){
              var isPaid = 1
            }
  
            var productObject = {}
            productObject.userId = request.id
            productObject.orderIDs = '#Ord' + val
            productObject.addressId = request.addressId
            productObject.isPlaced = 1
            productObject.timeId = request.deliveryTimeId
            productObject.deliveryDate = request.deliveryDate
            productObject.paymentId = request.paymentId
            productObject.orderOn = new Date()
            productObject.totalAmount = cartResult.originalPrice
            productObject.discountAmount = cartResult.discountAmount
            productObject.grandTotal = cartResult.cartAmount - couponDiscount
            productObject.couponDiscount = couponDiscount
            productObject.couponDiscountPer = couponDiscountPer
            productObject.fastDelivery = request.fastDelivery
            productObject.fastDelivery = request.fastDelivery
            productObject.deleteItems = request.deleteItems
            // console.log(request)
            request.amount = productObject.grandTotal
  
            if(request.isWallet === 'true'){
              var walletCheck =  await this.checkUserWallet(request)
              if(walletCheck.error === 'true'){
                callback(walletCheck)
                return
              }
              if(walletCheck.isPaidvalue === 1){
              productObject.grandTotal = walletCheck.payAmount
              productObject.paidByWallet = walletCheck.transAmount
              }
            }
  
            if(request.isTrustUser === 'true'){
              var isTrustUserCheck =  await this.checkisTrustUser(productObject)
              if(isTrustUserCheck.error === 'true'){
                callback(walletCheck)
                return
              }
              productObject.trustTrans = isTrustUserCheck.transAmount
              productObject.trustUserOrder = 1
              // console.log(isTrustUserCheck)
            }
            var taxCal = (request.ordertax / 100) *  productObject.grandTotal
            productObject.grandTotal = productObject.grandTotal + taxCal
            productObject.ordertax = taxCal
            productObject.taxValue = request.ordertax
            
            var saveOrder = await productDaoObject.saveOrdersDao(productObject)
            if (saveOrder.error) {
              response.error = 'true'
              response.message = 'fetch failed'
              callback(response)
            } else {
              var cartList = cartResult.cart
              var length = cartList.length
              var totalOty = 0
              async.each(cartList, async function (item) {
                var itemObject = {}
                itemObject.orderId = saveOrder.data[0]
                itemObject.u_id = request.id
                itemObject.productId = item.productId
                itemObject.quantity = item.quantity
                itemObject.storeId = item.storeId
                itemObject.price = item.productPrice
                itemObject.discount = item.productDiscount
                itemObject.supplyPrice = item.totalPrice
                itemObject.cuttingStyleId = item.cuttingStyle
                itemObject.boxStyleId = item.boxStyle
                itemObject.isPaid = isPaid
                if(item.specialInstructions){
                  itemObject.orderInstructions = item.specialInstructions
                }
                await productDaoObject.saveOrderItems(itemObject)

                await productDaoObject.updateStoreStockCount(itemObject)
  
                totalOty += item.quantity
  
                if (--length === 0) {
                  if(request.isWallet === 'true'){
                    if(walletCheck.error === 'false'){
                      if(walletCheck.isPaidvalue === 1){
                      request.amount = walletCheck.transAmount
                      await userDaoObject.updateUserWalletAmount(request)
  
                      var walletObject = {}
                      walletObject.userId = request.id
                      walletObject.orderId = saveOrder.data[0]
                      walletObject.transactionType = 'ORDER'
                      walletObject.amount = walletCheck.transAmount
                      walletObject.typeOfTrans = 'DEBIT'
                      await userDaoObject.updateWalletTransactionAmountDao(walletObject)
                      }
                    }
                  }

                  if (request.couponCode) {
                    if (couponCodeResult.error == 'false') {
                      var offerObj = {}
                      offerObj.userId = request.id
                      offerObj.couponId = couponCodeResult.couponId
                      offerObj.discountValue = couponCodeResult.discountVal
                      offerObj.orderId = saveOrder.data[0]
                      // console.log(offerObj)
                      await userDaoObject.updateUserOfferValueDao(offerObj)
                    }
                  }
  
                  if(request.isTrustUser === 'true'){
                    if(isTrustUserCheck.error === 'false'){
                      var trObject = {}
                      trObject.id = request.id
                      trObject.packageValue = isTrustUserCheck.walletBalance
                     await userDaoObject.updateProfileUserDao(trObject)
                    }
                  }
  
                  var userObject = { id: request.id, 	lastOrder: new Date() }
                  await userDaoObject.updateProfileUserDao(userObject)
                  await productDaoObject.removeUserCartDao(request.id)
                  await productDaoObject.updateProductQty(totalOty, saveOrder.data[0])

                  var notificationObj = {}
                  notificationObj.userId = request.id
                  notificationObj.notifyType = 'PLACEORDER'
                  notificationObj.orderId = saveOrder.data[0]

                  notificationObject.sendOrderNotification(notificationObj, 'ORDERS', 1, () => {})

                  response.error = 'false'
                  response.message = 'Success'
                  callback(response)
                }
              })
            }
          } else {
            response.error = 'true'
            response.message = 'Your ordered product is out of stock'
            callback(response)
          }
        } else {
          response.error = 'true'
          response.message = 'Cart empty'
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.checkisTrustUser = function (data) {
    return new Promise(async function (resolve) {
      var response = {}
      var userDaoObject = new userDao()
      var obj = {}
      obj.id = data.userId
      var users =  await userDaoObject.getUserProfileDao(obj)
      if(users.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        var amount = users.data[0].packageValue
        var payAmount = 0
        if(amount > 0) {
          console.log('-----paid---'+data.grandTotal)
          if(amount >  data.grandTotal) {
            var payAmount = 0
            var balance =  amount - data.grandTotal
            var trans = data.grandTotal
            console.log('wallet high')
            
            // var finalAmount = amount - data.amount  
          } else {
            console.log('wallet low')
            var trans = amount
            var balance = 0
            var payAmount = data.grandTotal - amount
           
            // var finalAmount = amount - data.amount 
          }

          response.error = 'false'
          response.walletBalance = balance
          response.payAmount = payAmount
          response.transAmount = trans
        } else {
          response.error = 'false'
          response.walletBalance = 0
          response.payAmount = data.grandTotal
          response.transAmount = 0
          // response.error = 'true'
          // response.message = 'Your credit amount is to low' 
        }
      }
      resolve(response)
    })
  }

  this.checkUserWallet = function (data) {
    return new Promise(async function (resolve) {
      // console.log(data.amount = data.)
      data.amount = data.grandTotal
      var response = {}
      var userDaoObject = new userDao()
      var users =  await userDaoObject.getUserProfileDao(data)
      if(users.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        var amount = users.data[0].walletAmount
        var payAmount = 0
        if(amount > 0) {
          console.log('-----paid---'+data.amount)
          if(amount >  data.amount) {
            var payAmount = 0
            var balance =  amount - data.amount
            var trans = data.amount
            console.log('wallet high')
            
            // var finalAmount = amount - data.amount  
          } else {
            console.log('wallet low')
            var trans = amount
            var balance = 0
            var payAmount = data.amount - amount
           
            // var finalAmount = amount - data.amount 
          }
          response.error = 'false'
          response.walletBalance = balance
          response.payAmount = payAmount
          response.transAmount = trans
          response.isPaidvalue = 1
          console.log('balance wal--------'+ balance)
          console.log('Paid amt--' + payAmount)
          console.log('trans----' +trans)
          // console.log(balance)
          // console.log('yes')
          // console.log(finalAmount)
        } else {
          response.error = 'false'
          response.isPaidvalue = 0
          response.walletBalance = amount
          response.transAmount = 0
          response.payAmount = data.amount
          response.message = 'Your wallet amount is to low'
        }
      }
      resolve(response)
    })
  }

  this.couponCodeService = function (data, cartItemsList) {
    return new Promise(async function (resolve) {
      var response = {}
      var productDaoObject = new productDao()
      var checkCoupon = await productDaoObject.checkCouponCodeDao(data)
      // console.log(data)
      if (checkCoupon.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if (checkCoupon.data.length > 0) {
          data.couponId = checkCoupon.data[0].id
          var miniOrder = checkCoupon.data[0].minimumValue
          var userAvailable = await productDaoObject.userAvailableCodeDao(data)
          if (userAvailable.error) {
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            // console.log(data.grandTotal)
            if (userAvailable.data.length == 0) {
              if(miniOrder != 0){
                // console.log(miniOrder)
                if(miniOrder < data.grandTotal){
                  var categoryId = checkCoupon.data[0].offCategoryId
                  var productId = checkCoupon.data[0].offProductId
                  //  var cartResult = await this.myCartDetails(data.id)
                  if(categoryId == null && productId == null){

                    var cal = (data.grandTotal) - (data.grandTotal - (data.grandTotal * (checkCoupon.data[0].discount / 100)))
                    response.error = 'false'
                    response.discountVal = cal
                    response.discount = checkCoupon.data[0].discount
                    response.couponId = checkCoupon.data[0].id
                  } else {
                    if(categoryId != null && productId == null){
                      var arrayFilter = cartItemsList.filter(x => x.productId == productId);
                    } else {
                      var arrayFilter = cartItemsList.filter(x => x.categoryId == categoryId && x.productId == productId);
                      // console.log(arrayFilter)
                    }
                    if(arrayFilter.length > 0){
                      var cal = (data.grandTotal) - (data.grandTotal - (data.grandTotal * (checkCoupon.data[0].discount / 100)))
                      response.error = 'false'
                      response.discountVal = cal
                      response.discount = checkCoupon.data[0].discount
                      response.couponId = checkCoupon.data[0].id
                    } else {
                      response.error = 'true'
                      response.message = 'product or category invalid'
                    }
                  }
                } else {
                  response.error = 'true'
                  response.message = 'Minimum value lower then your grand total'
                }
                // console.log(checkCoupon.data[0].minimumValue)
              } else {
                var cal = (data.grandTotal) - (data.grandTotal - (data.grandTotal * (checkCoupon.data[0].discount / 100)))
                response.error = 'false'
                response.discountVal = cal
                response.discount = checkCoupon.data[0].discount
                response.couponId = checkCoupon.data[0].id
              }

            } else {
              response.error = 'true'
              response.message = 'CouponCode already used'
            }
          }
        } else {
          response.error = 'true'
          response.message = 'Invalid Coupon Code'
        }
      }
      resolve(response)
    })
  }

  this.checkUserCouponCodeService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var productDaoObject = new productDao()
      var cartResult = await this.myCartDetails(request.id)
      if(cartResult.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if(cartResult.cart.length > 0){
          var cartItemsList = cartResult.cart 
          request.grandTotal = cartResult.cartAmount
          var couponCodeResult = await this.couponCodeService(request, cartItemsList)
          // console.log(couponCodeResult)
          if(couponCodeResult.error == 'true'){
            response.error = 'true'
            response.message = couponCodeResult.message
          } else {
            resp.couponCode = couponCodeResult
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
        } else {
          response.error = 'true'
          response.message = 'Cart empty'
        }
      }
      // console.log(cartResult)
      // var checkCode = await productDaoObject.checkUserCouponCodeDao(request)
      // if(checkCode.error){
      //   response.error = 'true'
      //   response.message = 'failed to retrive store details'
      // } else {
      //   if(checkCode.data.length === 0){
      //     var code = await productDaoObject.checkCouponCodeDao(request)
      //     // console.log(code)
      //     resp.discount = code.data[0].discount
      //     response.error = 'false'
      //     response.message = 'success'
      //     response.data = resp
      //   } else {
      //     response.error = 'true'
      //     response.message = 'Invalid offer code'
      //   }
      // }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }


  this.userOrderListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var trustUser = {}
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()
      var appSettings = await productDaoObject.productAppSettings()
      var user = await userDaoObject.getUserProfileDao(request)
      trustUser.id = user.data[0].id
      trustUser.isTrustUser = user.data[0].trustUser
      trustUser.packageValue = user.data[0].packageValue
      // console.log(trustUser)
      request.queryType = 'TOTAL'
      if (request.type == 'ACTIVE') {
        request.con = ['PICKUP', 'ACCEPTED', 'ONGOING', 'PENDING']
      } else {
        request.con = ['COMPLETED', 'REJECTED', 'CANCELLED']
      }
      var orderList = await productDaoObject.getUserOrderListDao(request)
      if (orderList.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if (orderList.data.length > 0) {
          request.pageCount = 10
          request.queryType = 'LIST'
          var result = await productDaoObject.getUserOrderListDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            var total = orderList.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            resp.settings = appSettings.data[0]
            resp.trustUser = trustUser
            resp.pages = total
            
            resp.tax = appSettings.data[0].taxAmount
            resp.orderList = result.data
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
        } else {
          resp.tax = appSettings.data[0].taxAmount
          resp.pages = 0
          resp.trustUser = trustUser
          resp.settings = appSettings.data[0]
          resp.orderList = []
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.userViewOrderService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var productDaoObject = new productDao()
      var appSettings = await productDaoObject.productAppSettings()
      var userDaoObject = new userDao()
      var order = await productDaoObject.checkUserOrderDao(request)
      if (order.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
        callback(response)
      } else {
        var orderItemsResult = await productDaoObject.userOrderItemsDao(request)
        if (orderItemsResult.error) {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        } else {
          var orderList = orderItemsResult.data
          var length = orderList.length
          async.eachOfSeries(orderList, async function (item, index) {
            var req = {
              productId: item.productId,
              userId: request.id
            }
            orderList[index].isFavourite = 'false'
            orderList[index].productImage = ''
            var productImagesDao = await userDaoObject.productImagesDao(req)
            var checkFav = await productDaoObject.checkUserFavProduct(req)

            if(productImagesDao.result.length > 0){
              orderList[index].productImage = productImagesDao.result
            }
            if (checkFav.data.length > 0) {
              orderList[index].isFavourite = 'true'
            }
            if (--length === 0) {
              var orderData = order.data[0]
              orderData.tax = appSettings.data[0].taxAmount
              resp.tax = appSettings.data[0].taxAmount
              resp.orderInfo = orderData
              resp.orderList = orderItemsResult.data
              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          })
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.userOrderCancelledService = async (request, callback) => {
    try {
      var response = {}
      var productDaoObject = new productDao()
      var userDaoObject = new userDao()
      var checkOrder = await productDaoObject.checkUserOrderDao(request)
      if(checkOrder.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if(checkOrder.data.length > 0){
          var status = checkOrder.data[0].orderStatus
          if(status !== 'CANCELLED') {
            var amount = checkOrder.data[0].grandTotal
            var payType = checkOrder.data[0].paytype
            var update = { id: request.orderId, cancelledByUser:1, orderStatus: 'CANCELLED', cancelDate: new Date(), cancelReason: request.reason  }
            var order = await productDaoObject.updateUserOrderStatus(update)
            if (order.error) {
              response.error = 'true'
              response.message = 'failed to retrive store details'
            } else {
              if(payType === 'card'){
                var walletObject = {}
                walletObject.userId = request.id
                walletObject.transactionType = 'ORDER'
                walletObject.amount = amount
                walletObject.typeOfTrans = 'CREDIT'
                await userDaoObject.updateWalletTransactionAmountDao(walletObject)

                var referObject = {}
                referObject.referFrom = request.id
                referObject.amount = amount
                await userDaoObject.updateWalletAmountDao(referObject)
              }
              response.error = 'false'
              response.message = 'Order Cancelled successfully'
            }
          } else {
            response.error = 'true'
            response.message = "Order Can't be cancel"
          }
        } else {
          response.error = 'true'
          response.message = 'Invalid orderID' 
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.userUpdateDeliveryDateService = async (request, callback) => {
    try {
      var response = {}
      var productDaoObject = new productDao()
      var update = { id: request.orderId, deliveryDate: request.deliveryDate, timeId: request.deliveryTimeId }
      var order = await productDaoObject.updateUserOrderStatus(update)
      if (order.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
        response.message = 'Delivery date updated successfully'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.viewRelatedProductService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var productDaoObject = new productDao()
      var userDaoObject = new userDao()
      request.queryType = 'TOTAL'
      var allProduct = await productDaoObject.getAllRelatedProductsDao(request)
     
      if(allProduct.error){
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if(allProduct.data.length > 0){
          
          request.queryType = 'LIST'
          request.pageCount = 10
          var total = allProduct.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
          var results = await productDaoObject.getAllRelatedProductsDao(request)
          if(results.error){
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            var products = results.data
            var length = products.length
            if(length > 0){

              async.eachOfSeries(products, async function (item, index) {
                var req = {
                  productId: item.id
                }
                products[index].isFavourite = 'false'
                products[index].quantity = 0
                if (request.userId) {
                  req.userId = request.userId
                  req.id = request.userId
                  var checkFav = await productDaoObject.checkUserFavProduct(req)
                  var checkCartCount = await productDaoObject.checkMyCartProduct(req)

                  if (checkCartCount.data.length > 0) {
                    products[index].quantity = checkCartCount.data[0].quantity
                  }
                  if (checkFav.data.length > 0) {
                    products[index].isFavourite = 'true'
                  }
                }
                var productImagesDao = await userDaoObject.productImagesDao(req)
                // var produdctVariant = await productDaoObject.getProdudctVariantDao(req)
                // products[index].variants = produdctVariant.data
                products[index].productImages = productImagesDao.result
                if (--length === 0) {
                  resp.pages = total
                  resp.products = products

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })

            } else {
              resp.pages = total
          resp.products = results.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
            }
          }
        } else {
          resp.pages = 0
          resp.products = allProduct.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.userSaveSearchService = async (request, callback) => {
    try {
      var response = {}
      if(!request.userId){
        request.userId = null
      }
      var productDaoObject = new productDao()
      var order = await productDaoObject.userSaveSearchDao(request)
      if (order.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.walletTransactionList = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      request.queryType = 'TOTAL'
      var productDaoObject = new productDao()
      var checkTrans = await productDaoObject.userWalletTransListDao(request)
      if(checkTrans.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if(checkTrans.data.length > 0){
          request.queryType = 'LIST'
          request.pageCount = 10
          var total = checkTrans.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
          var results = await productDaoObject.userWalletTransListDao(request)
          if(results.error){
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            resp.pages = total
            resp.list = results.data
  
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }

        } else {
          resp.pages = 0
          resp.list = checkTrans.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.addRatingService = async (request, callback) => {
    try {
      var response = {}
      var productDaoObject = new productDao()
      if(request.commemts){
        request.commemts = request.commemts
      } else {
        request.commemts = ''
      }
      var order = await productDaoObject.userSaveRatingDao(request)
      if (order.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  

}
