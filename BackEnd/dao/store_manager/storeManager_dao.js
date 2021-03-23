module.exports = function () {
  var mysqlExecute = require('../../connection.js')
  const db = require('../../db.js')

  this.getstoreUserDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
        .select('id', 'firstName', 'lastName', 'email', 'countryCode', 'mobileNumber')
        .where({ mobileNumber: data.mobileNumber })
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

  this.getStoreProfileDetails = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('store')
        .select('id', 'storeName', 'storeID', 'status')
        .where({ id: data.storeId })
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

  this.updateStoreAppStatusDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('store')
        .where({ id: data.storeId })
        .update('status', data.status)
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

  this.storeManagerProfileDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('storemanager')
        .select('id', 'firstName', 'lastName', 'email', 'countryCode', 'mobileNumber', 'status')
        .where({ id: data.id })
        .then((result) => {
          // console.log(result)
          response.error = false
          response.result = result
          resolve(response)
        })
        .catch((error) => {
          // response.error = true
          reject(error)
        })
    })
  }

  this.getstoreDetailsDaobyid = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('storemanager')
        .select('id', 'firstName', 'lastName', 'email', 'countryCode', 'mobileNumber', 'post', 'dob', 'gender', 'status')
        .where({ id: data.id })
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

  this.getstoreUserDetailsDaobyId = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      var id = data.id
      db('storemanager')
        .select('*')
        .where({ id: id })
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

  this.updatestoremanagerDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
        .where({ id: data.id })
        .update({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          countryCode: data.countryCode,
          mobilenumber: data.mobilenumber,
          dob: data.dob,
          gender: data.gender,
          status: data.status
        })
        .then((result) => {
          console.log('result')
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

  this.updateDeviceTokenDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
        .where({ id: data.id })
        .update({ os: data.os, fcmToken: data.fcmToken })
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

  this.checkStoreEmailMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.raw('select * from storemanager where ( email=? OR  mobileNumber=? ) AND id != ?', [data.email, data.mobileNumber, data.id])
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

  this.updateManagerProfileUserDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('storemanager')
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
}
