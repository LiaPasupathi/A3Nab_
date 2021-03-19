module.exports = function () {
  const db = require('../db.js')

  this.getAdminLoginDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('Admin')
      .select('id', 'email', 'firstName', 'password', 'roleId', 'lastName', 'mobileNumber', 'role', 'account', 'level1', 'level2', 'level3', 'superAdmin')
        .orWhere('email', data.email)
        .where('isDelete', 0)
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

  this.appSettingsDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('appSettings')
        .select('id', 'radius')
        .then((result) => {
          response.error = 'false'
          response.result = result[0]
        })
        .catch((error) => {
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.appUpdateSettingsDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('appSettings')
        .select('id', 'radius')
        .update('radius', data.radius)
        .then((result) => {
          response.error = 'false'
          response.result = result[0]
        })
        .catch((error) => {
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getAdminPermissionDao = (roleId) => {
    var response = {}
    return new Promise(async function (resolve) {
      console.log(roleId)
      db('rolePermission')
        .where('roleId', roleId)
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

  this.getStoreDistanceDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('store')
        .select('id', 'latitude', 'storeRadius', 'longitude', db.raw('ST_Distance_Sphere(point(store.longitude, store.latitude), point(' + data.lng + ', ' + data.lat + ')) / 1000 AS distance'))
        .where({ isStoreDelete: 0, 'store.status': 'active', })
        // .having('distance', '<', 'storeRadius')
        .then((result) => {
          if(result.length > 0){
            var arrayFilter = result.filter(function (element) {
              return element.distance < (element.storeRadius)
            })
            var storeIds = []
            arrayFilter.forEach(async function (data) {
              storeIds.push(data.id)
            })
            response.error = false
            response.result = storeIds
          } else {
            response.error = false
            response.result = result 
          }
        })
        .catch((error) => {
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.checkEmailOrMobileDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('Admin')
        .orWhere('email', data.email)
        .orWhere('mobileNumber', data.mobileNumber)
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

  this.saveSubadminDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('Admin')
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

  this.getSubadminListDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('Admin')
      .select('id', 'email', 'firstName', 'lastName', 'mobileNumber', 'role', 'account', 'level1', 'level2', 'level3', 'superAdmin', 'createdAt')
        .where('role', 'admin')
        .where('isDelete',0)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = false
          response.result = result
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


  this.getAdminRolesDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('roles')
        .select('id', 'roleName')
        .then((result) => {
          response.error = false
          response.result = result
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

  this.roleByPermissionDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('rolePermission')
        .select('id', 'permissionName', 'readOpt', 'writeOpt', 'exportOpt')
        .where('roleId', data.roleId)
        .then((result) => {
          response.error = false
          response.result = result
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

  this.updatePermissionDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('rolePermission')
        .where({ 'roleId': data.roleId, 'id': data.id })
        .update(data)
        .then((result) => {
          response.error = false
          response.result = result
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

  this.updateSubadminDao = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      db('Admin')
        .update(data)
        .where('id', data.id)
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