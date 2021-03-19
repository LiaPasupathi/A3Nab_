module.exports = function () {
  var async = require('async')
  var userDao = require('../dao/user_dao.js')
  var productDao = require('../dao/products_dao')
  require('../utils/common.js')()
  require('../utils/error.js')()
  require('dotenv').config()

  this.loginUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var userDaoObject = new userDao()
      try {
        var loginUserDao = await userDaoObject.getUserloginDetailsDao(userData)
        if (loginUserDao.error == 'true') {
          response.error = 'true'
          response.message = 'OOPS login later'
          resolve(response)
        } else {
          if (loginUserDao.result.length != 0) {
            var genToken = {}
            genToken.id = loginUserDao.result[0].id
            genToken.mobileNumber = loginUserDao.result[0].mobileNumber
            genToken.counrtyCode = loginUserDao.result[0].counrtyCode
            var token = await this.generateToken(genToken)

            loginUserDao.result[0].token = Buffer.from(token).toString('base64')
            loginUserDao.result[0].userExists = 'true'
            response.error = 'false'
            response.message = 'login success'
            response.result = loginUserDao.result[0]
            resolve(response)
          } else {
            response.error = 'false'
            response.message = 'not registered'
            response.result = { token: null, userExists: 'false', id: null, firstName: null, lastName: null, email: null, otp: null, latitude: null, longitude: null, counrtyCode: null, mobileNumber: null, profilePic: null }
            resolve(response)
          }
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.createAccountUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var userDaoObject = new userDao()
      try {
        var loginUserDao = await userDaoObject.getUserDetailsDao(userData)
        if (loginUserDao.error == 'true') {
          response.error = 'true'
          response.message = 'OOPS signup later'
          resolve(response)
        } else {
          if (loginUserDao.result.length != 0) {
            response.error = 'true'
            response.message = 'already registered'
            resolve(response)
          } else {
            var userRefCode = userData.referralCode
            if (userData.referralCode) {
              var checkReferral = await userDaoObject.checkReferralUserId(userData)
              if (checkReferral.data.length == 0) {
                response.error = 'true'
                response.message = 'Invalid Referral Code'
                resolve(response)
                return
              }
            }
            var key = await this.alphaNumericString()
            var val = Math.floor(1000 + Math.random() * 9000)
            userData.referralCode = key
            userData.customerID = '#Cu_ID' + val
            var createUserDao = await userDaoObject.createUserDetailsDao(userData)
            if (createUserDao.error == 'true') {
              response.error = 'true'
              response.message = 'OOPS signup later'
              resolve(response)
            } else {
              var resultObj = {}
              var genToken = {}
              var walletObject = {}
              // Referral User Details
              if (userRefCode) {
                var referObject = {}
                referObject.referFrom = checkReferral.data[0].id
                referObject.referTo = createUserDao.result[0]
                referObject.amount = 100
                await userDaoObject.addReferralDetails(referObject)
                await userDaoObject.updateWalletAmountDao(referObject)
                walletObject.userId = checkReferral.data[0].id
                walletObject.transactionType = 'WALLET'
                walletObject.amount = 100
                walletObject.typeOfTrans = 'CREDIT'
                await userDaoObject.updateWalletTransactionAmountDao(walletObject)
              }
              genToken.id = createUserDao.result[0]
              genToken.mobileNumber = userData.mobileNumber
              genToken.counrtyCode = userData.counrtyCode
              response.error = 'false'
              response.message = 'signup success'
              resultObj.id = createUserDao.result[0]
              resultObj.firstName = userData.firstName
              resultObj.lastName = userData.lastName
              resultObj.counrtyCode = userData.counrtyCode
              resultObj.mobileNumber = userData.mobileNumber
              var token = await this.generateToken(genToken)
              resultObj.token = Buffer.from(token).toString('base64')
              response.result = resultObj
              resolve(response)
            }
          }
        }
      } catch (err) {
        console.log(err)
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.homeDashboardUserService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var activeCategory = await userDaoObject.getHomeCategoryProductListtDao(request)
      if(activeCategory.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        // console.log(activeCategory)
        Promise.all([
          userDaoObject.getOfferDetailsDao(request),
          userDaoObject.getUserHomeCategoryDao(activeCategory.data),
          this.homeBestProductService(request),
          this.myHomeCartDetails(request),
          userDaoObject.getUserRatingListDao(request)
        ])
          .then(result => {
            // console.log(result[4])
            resp.cartDetails = result[3]
            resp.rating = result[4].data
            resp.bannerImages = result[0].data
            resp.category = result[1].data
            resp.bestProducts = result[2].data
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
            callback(response)
          })
          .catch(error => {
            response.error = 'true'
            response.message = 'failed to retrive store details'
            callback(response)
          })
      }      
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.myHomeCartDetails = function (data) {
    return new Promise(async function (resolve) {
      var response = {}
      if (data.userId) {
        var userId = data.userId

        var productObject = new productDao()
        var mycart = await productObject.getMyCardItems(userId)
        var cart = await productObject.getCardItems(userId, mycart.data)
        if (cart.error) {
          response.error = true
        } else {
          var cartItems = cart.data
          if (cartItems.length > 0) {
            var totalSum = await productObject.cartTotalSumValue(userId)
            if (totalSum.error) {
              response.error = true
            } else {
              response.error = false
              // response.cart = cartItems
              response.cartCount = cartItems.length
              response.discountAmount = totalSum.data[0].discountPrice
              response.cartAmount = totalSum.data[0].totalPrice
            }
          } else {
            response.error = false
            // response.cart = cartItems
            response.cartCount = 0
            response.cartAmount = 0
            response.discountAmount = 0
          }
        }
      } else {
        response.error = false
        // response.cart = []
        response.cartCount = 0
        response.cartAmount = 0
        response.discountAmount = 0
      }
      resolve(response)
    })
  }

  this.homeBestProductService = function (data) {
    return new Promise(async function (resolve, reject) {
      var response = {}
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()
      var offers = await userDaoObject.bestProductsDao(data)
      if (offers.errr) {
        response.error = true
        reject(response)
      } else {
        if (offers.data.length > 0) {
          var products = offers.data
          var length = products.length
          async.eachOfSeries(products, async function (item, index) {
            var req = {
              productId: item.id
            }
            products[index].isFavourite = 'false'
            products[index].quantity = 0
            if (data.userId) {
              req.userId = data.userId
              req.id = data.userId
              var checkFav = await productDaoObject.checkUserFavProduct(req)
              var checkCartCount = await productDaoObject.checkMyCartProduct(req)

              var cuttingStyle = await userDaoObject.findCuttingStyleDao(req)
              products[index].cuttingStyle = cuttingStyle.result

              var boxStyle = await userDaoObject.findBoxStyleDao(req)
              products[index].boxStyle = boxStyle.result

              if (checkCartCount.data.length > 0) {
                products[index].quantity = checkCartCount.data[0].quantity
              }
              if (checkFav.data.length > 0) {
                products[index].isFavourite = 'true'
              }
            }
            var productImagesDao = await userDaoObject.productImagesDao(req)
            // var produdctVariant = await productDaoObject.getProdudctVariantDao(req)
            products[index].productImages = productImagesDao.result
            // products[index].variants = produdctVariant.data
            if (--length === 0) {
              response.error = false
              response.data = products
              resolve(response)
            }
          })
        } else {
          response.error = false
          response.data = offers.data
          resolve(response)
        }
      }
    })
  }

  // this.homeDashboardUserService = (userData) => {
  //   return new Promise(async function (resolve) {
  //     var response = {}
  //     var resp = {}
  //     var userDaoObject = new userDao()
  //     Promise.all([
  //       userDaoObject.getOfferDetailsDao(),
  //       userDaoObject.getUserCategoryDao(),
  //       userDaoObject.bestProductsDao()
  //     ])
  //       .then(result => {
  //         resp.bannerImages = result[0].data
  //         resp.category = result[1].data
  //         resp.bestProducts = result[2].data
  //         response.error = 'false'
  //         response.result = resp
  //         resolve(response)
  //       })
  //       .catch(error => {
  //         response.error = 'true'
  //         resolve(response)
  //       })
  //   })
  // }

  this.getDetailStoreViewService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var bannerImages = await userDaoObject.getOfferDetailsDao()
        if (bannerImages.error === 'false') {
          var categoryListDao = await userDaoObject.categoryListDao(userData)
          var productCategoryListDao = await userDaoObject.productCategoryListDao(userData)
          var getBestProductDao = await userDaoObject.getBestProductDao(userData)
          if (categoryListDao.error === 'false') {
            response.error = 'false'
            response.message = 'store details retrived successfully'
            resp.category = categoryListDao.result
            resp.bannerImages = bannerImages.result
            resp.productCategory = productCategoryListDao.result
            var getBestProductLength = getBestProductDao.result.length
            if (getBestProductLength > 0) {
              getBestProductDao.result.forEach(async function (data, index) {
                var req = {
                  productId: data.id
                }
                var productImagesDao = await userDaoObject.productImagesDao(req)
                getBestProductDao.result[index].productImages = productImagesDao.result
                if (--getBestProductLength == 0) {
                  resp.bestProducts = getBestProductDao.result
                  response.result = resp
                  resolve(response)
                }
              })
            } else {
              resp.bestProducts = getBestProductDao.result
              response.result = resp
              resolve(response)
            }
          } else {
            response.error = 'true'
            response.message = 'failed to retrive store details'
            resolve(response)
          }
        } else {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.getDetailProductCategoryViewService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var productCategoryListDao = await userDaoObject.productCategoryListDao(userData)
        if (productCategoryListDao.error === 'false') {
          var productSubCategoryListDao = await userDaoObject.productSubCategoryListDao(userData)
          if (productSubCategoryListDao.error === 'false') {
            response.error = 'false'
            response.message = 'store details retrived successfully'
            resp.productCategory = productCategoryListDao.result
            resp.productSubCategory = productSubCategoryListDao.result
            resp.products = []
            response.result = resp
            resolve(response)
          } else {
            response.error = 'true'
            response.message = 'failed to retrive store details'
            resolve(response)
          }
        } else {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.getListProductViewService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var productListDao = await userDaoObject.productListDao(userData)
        if (productListDao.error === 'false') {
          var productListLength = productListDao.result.length
          if (productListLength > 0) {
            productListDao.result.forEach(async function (data, index) {
              var req = {
                productId: data.id
              }
              var productImagesDao = await userDaoObject.productImagesDao(req)
              productListDao.result[index].productImages = productImagesDao.result
              if (--productListLength == 0) {
                response.error = 'false'
                response.message = 'store details retrived successfully'
                resp.products = productListDao.result
                response.result = resp
                resolve(response)
              }
            })
          } else {
            response.error = 'false'
            response.message = 'store details retrived successfully'
            resp.products = productListDao.result
            response.result = resp
            resolve(response)
          }
        } else {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.homeSearchUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var searchData = await userDaoObject.homeSearchUserDao(userData)
        if (searchData.error === 'false') {
          response.error = 'false'
          response.message = 'homedashboard retrived successfully'
          response.result = searchData.result
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'fetch failed'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.getBestProductService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var productListDao = await userDaoObject.getBestProductDao(userData)
        if (productListDao.error === 'false') {
          var productListLength = productListDao.result.length
          if (productListLength > 0) {
            productListDao.result.forEach(async function (data, index) {
              var req = {
                productId: data.id
              }
              var productImagesDao = await userDaoObject.productImagesDao(req)
              productListDao.result[index].productImages = productImagesDao.result
              if (--productListLength == 0) {
                response.error = 'false'
                response.message = 'store details retrived successfully'
                resp.products = productListDao.result
                response.result = resp
                resolve(response)
              }
            })
          } else {
            response.error = 'false'
            response.message = 'store details retrived successfully'
            resp.products = productListDao.result
            response.result = resp
            resolve(response)
          }
        } else {
          response.error = 'true'
          response.message = 'fetch failed'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.productCategorySearchService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var searchData = await userDaoObject.productCategorySearchDao(userData)
        if (searchData.error === 'false') {
          response.error = 'false'
          response.message = 'Success'
          response.result = searchData.result
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'fetch failed'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.productSearchService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        if (userData.type == 'CATEGORY') {
          var object = { productCategoryId: userData.id }
        } else {
          var object = { productSubCategoryId: userData.id }
        }

        var productSearch = await userDaoObject.productSearchDao(object, userData)
        if (productSearch.error === 'false') {
          var productListLength = productSearch.result.length
          if (productListLength > 0) {
            productSearch.result.forEach(async function (data, index) {
              var req = {
                productId: data.id
              }
              var productImagesDao = await userDaoObject.productImagesDao(req)
              productSearch.result[index].productImages = productImagesDao.result
              if (--productListLength == 0) {
                response.error = 'false'
                response.message = 'store details retrived successfully'
                response.result = productSearch.result
                resolve(response)
              }
            })
          } else {
            response.error = 'false'
            response.message = 'store details retrived successfully'
            response.result = productSearch.result
            resolve(response)
          }
        } else {
          response.error = 'true'
          response.message = 'fetch failed'
          resolve(response)
        }
      } catch (err) {
        console.log(err)
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.deleteUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var searchData = await userDaoObject.deleteAllddressesDao(userData)
        var searchData = await userDaoObject.deleteUserDao(userData)
        if (searchData.error === 'false') {
          response.error = 'false'
          response.message = 'updated configurations'
          response.result = searchData.result
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'fetch failed'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.getAllAddsUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var bannerImages = await userDaoObject.getAllOfferDetailsDao()
        if (bannerImages.error === 'false') {
          response.error = 'false'
          response.message = 'ads retrived successfully'
          response.result = bannerImages.result
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to retrive ads'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.getMyAddressesService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var bannerImages = await userDaoObject.getAddressDao(userData)
        if (bannerImages.error === 'false') {
          response.error = 'false'
          response.message = 'address retrived successfully'
          response.result = bannerImages.result
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to retrive address'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }



  this.getMyProfileUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var getMyProfileUserDao = await userDaoObject.getMyProfileUserDao(userData)
        if (getMyProfileUserDao.error === 'false') {
          response.error = 'false'
          response.message = 'profile details retrived successfully'
          resp.profileDetails = getMyProfileUserDao.result
          response.result = resp
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to retrive profile details'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.updateProfileUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var userDaoObject = new userDao()
      try {
        var checkUser = await userDaoObject.checkUpdateEmailMobileDao(userData)
        if (checkUser.error) {
          response.error = 'true'
          response.message = 'failed to upadte profile details'
        } else {
          if (checkUser.data.length == 0) {
            var getMyProfileUserDao = await userDaoObject.updateProfileUserDao(userData)
            if (getMyProfileUserDao.error === 'false') {
              response.error = 'false'
              response.message = 'profile details updated successfully'
            } else {
              response.error = 'true'
              response.message = 'failed to upadte profile details'
            }
          } else {
            response.error = 'true'
            response.message = 'Mobile or email already exists'
          }
        }
      } catch (err) {
        response.error = 'true'
        response.message = 'OOPS Service Error'
      }
      resolve(response)
    })
  }

  this.updateDeviceTokenService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var updateDeviceTokenDao = await userDaoObject.updateDeviceTokenDao(userData)
        if (updateDeviceTokenDao.error === 'false') {
          response.error = 'false'
          response.message = 'FCM updated successfully'
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to upadte FCM'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.addAddressesService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        // console.log(userData)
        var addAddresses = await userDaoObject.addAddressesDao(userData)
        if (addAddresses.error === 'false') {
          response.error = 'false'
          response.message = 'Address Added successfully'
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to add address'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.updateCurrentAddressService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var userDaoObject = new userDao()
      var checkCurrentAdd = await userDaoObject.checkCurrentAddressDao(request)
      if(checkCurrentAdd.error){
        response.error = 'true'
        response.message = 'failed to update address'
      } else {
        if(checkCurrentAdd.result.length > 0){
          request.type = 'CURRENT'
          request.addressId = checkCurrentAdd.result[0].id
          resp.addressId = checkCurrentAdd.result[0].id
          var address = await userDaoObject.updateAddressesDao(request)
        } else {
          request.type = 'CURRENT'
          var address = await userDaoObject.addCurrAddressesDao(request)
          resp.addressId = address.result[0]
        }
        if(address.error === 'true'){
          response.error = 'true'
          response.message = 'failed to add address'
        } else {
          response.error = 'false'
          response.message = 'Address Added successfully'
          response.data = resp
        }
      }
    } catch(e){
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.updateAddressesService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        // console.log(userData)
        var updateAddressesDao = await userDaoObject.updateAddressesDao(userData)
        if (updateAddressesDao.error === 'false') {
          response.error = 'false'
          response.message = 'Address Updated successfully'
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to update address'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.deleteAddressesService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var deleteAddressesDao = await userDaoObject.deleteAddressesDao(userData)
        if (deleteAddressesDao.error === 'false') {
          response.error = 'false'
          response.message = 'Address deleted successfully'
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to delete address'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.searchAddsUserService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      try {
        var searchAddsUserDao = await userDaoObject.searchAddsUserDao(userData)
        if (searchAddsUserDao.error === 'false') {
          response.error = 'false'
          response.message = 'ads retrived successfully'
          response.result = searchAddsUserDao.result
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'fetch failed'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  /**********************************************************************************/
  this.getProductCategoryService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      Promise.all([
        userDaoObject.getProductUserCategoryDao(request),
        this.homeBestProductService(request)
      ])
        .then(result => {
          // console.log(result)
          resp.productCategory = result[0].data
          resp.bestProducts = result[1].data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        })
        .catch(error => {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.getProductSubCategoryService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var userDaoObject = new userDao()
      var result = await userDaoObject.getProductSubCategoryDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        resp.productCategory = result.data

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

  this.viewBestProductService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      // console.log(request)
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()
      request.queryType = 'TOTAL'
      var distance = await userDaoObject.getBestDistanceProductListtDao(request)
      request.productIds = distance.data
      var totalResult = await userDaoObject.getUserBestProductDao(request)
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
          var result = await userDaoObject.getUserBestProductDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            var products = result.data
            var length = products.length
            if (length > 0) {
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

  this.getProductListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()
      var bestProducts = await this.homeBestProductService(request)
      if (request.type == 'CATEGORY') {
        var object = { productCategoryId: request.id }
      } else {
        var object = { productSubCategoryId: request.id }
      }
      request.queryType = 'TOTAL'
      var productIdsRes =  await userDaoObject.getDistanceProductListtDao(request, object)
      request.productIds = productIdsRes.data
      var totalResult = await userDaoObject.getProductListtDao(request, object)
      if (totalResult.error || bestProducts.error) {
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
          var result = await userDaoObject.getProductListtDao(request, object)
          if (result.error) {
            response.error = 'true'
            response.message = 'fetch failed'
            callback(response)
          } else {
            var products = result.data
            var length = products.length
            if (length > 0) {
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
                  resp.bestProducts = bestProducts.data

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.pages = total
              resp.products = result.data
              resp.bestProducts = bestProducts.data

              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.pages = 0
          resp.products = totalResult.data
          resp.bestProducts = bestProducts.data

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.viewProductDetails = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var productDaoObject = new productDao()

      var viewProduct = await productDaoObject.viewProductDao(request)
      var imageResult = await userDaoObject.productImagesDao(request)

      var cuttingStyle = await userDaoObject.findCuttingStyleDao(request)
      var boxStyle = await userDaoObject.findBoxStyleDao(request)

      // var variantResult = await productDaoObject.getProdudctVariantDao(request)
      var relatedResult = await this.userRelatedProductService(request)

      if (viewProduct.error || imageResult.error == 'true' || relatedResult.error || boxStyle.err || cuttingStyle.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        if(viewProduct.data.length > 0){
          var productDetails = viewProduct.data[0]
          productDetails.isFavourite = 'false'
          productDetails.quantity = 0
          productDetails.productImages = imageResult.result
          productDetails.boxStyle = boxStyle.result
          productDetails.cuttingStyle = cuttingStyle.result
          // productDetails.variants = variantResult.data
          if (request.userId) {
            request.id = request.userId
            var checkCartCount = await productDaoObject.checkMyCartProduct(request)
  
            if (checkCartCount.data.length > 0) {
              productDetails.quantity = checkCartCount.data[0].quantity
            }
  
            var checkFav = await productDaoObject.checkUserFavProduct(request)
            if (checkFav.data.length > 0) {
              productDetails.isFavourite = 'true'
            }
          }
          var bestProduct = await this.homeBestProductService(request)
          if (bestProduct.error) {
            response.error = 'true'
            response.message = 'fetch failed'
          } else {
            resp.productDetails = productDetails
            resp.relatedProducts = relatedResult.data
            resp.bestProducts = bestProduct.data
  
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
        } else {
          response.error = 'true'
        response.message = 'Invalid Product ID'
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.userRelatedProductService = function (request) {
    return new Promise(async function (resolve) {
      var response = {}

      var productDaoObject = new productDao()
      var userDaoObject = new userDao()
      var productResult = await productDaoObject.getRelatedProductsDao(request)

      if (productResult.error) {
        response.error = true
      } else {
        var products = productResult.data
        var length = products.length
        if (length > 0) {
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
              response.error = false
              response.message = 'Success'
              response.data = products
              resolve(response)
            }
          })
        } else {
          response.error = false
          response.message = 'Success'
          response.data = []
          resolve(response)
        }
      }
    })
  }

  this.getUserProfileService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var userProfile = await userDaoObject.getUserProfileDao(request)
      if (userProfile.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        var userResult = userProfile.data[0]
        var DOB = userResult.DOB
        if(DOB == null){
          userResult.year = ''
          userResult.day = ''
          userResult.month = ''
        } else {
          var res = DOB.split("-");
          userResult.year = res[0]
          userResult.day = res[2]
          userResult.month = res[1]
        }
        userResult.points = 30
        resp.profile = userResult
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.appFeedbackService = async (request, callback) => {
    try {
      var response = {}
      var userDaoObject = new userDao()
      var result = await userDaoObject.saveappFeedbackDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'fetch failed'
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

  this.unavailableProductService = async (request, callback) => {
    try {
      var response = {}
      var userDaoObject = new userDao()
      if(request.userId){
        request.userId = request.userId
      } else {
        request.userId = null
      }
      // console.log(request)
      var order = await userDaoObject.unavailableProductDao(request)
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

  this.walletHistoryService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var wallet = await userDaoObject.getUserProfileDao(request)
      request.queryType = 'TOTAL'
      var history = await userDaoObject.getWalletHistoryDao(request)
      if(history.error || wallet.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        request.queryType = 'LIST'
        request.pageCount = 10
        var historyResult = await userDaoObject.getWalletHistoryDao(request)
        if(historyResult.error){
          response.error = 'true'
          response.message = 'OOPS DAO Exception'
        } else {
          resp.amount = wallet.data[0].walletAmount
          resp.wallet = historyResult.data
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

  this.getUserfaqService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var getFaq = await userDaoObject.getUserfaqDao()
      if(getFaq.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.faq = getFaq.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.updateUserSettingService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var userDaoObject = new userDao()
      var object = {}
      object.id = request.id
      if(request.offersNotify){
        object.offersNotify = request.offersNotify
      }
      if(request.ordersNotify){
        object.ordersNotify = request.ordersNotify
      }
      if(request.announcementNotify){
        object.announcementNotify = request.announcementNotify
      }
      if(request.othersNotify){
        object.othersNotify = request.othersNotify
      }
      if(request.offersNotify || request.ordersNotify || request.announcementNotify || request.othersNotify){
        var updateProfile = await userDaoObject.updateProfileUserDao(object)
        if(updateProfile.error == 'true'){
          response.error = 'true'
          response.message = 'OOPS DAO Exception'
        } else {
          response.error = 'false'
          response.message = 'Success'
        }
      } else {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

}


