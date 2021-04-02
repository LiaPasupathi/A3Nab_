module.exports = function () {
  var adminDao = require('../dao/admin_dao.js')
   require('../utils/common.js')()
   var crypto = require('crypto')

  this.loginAdminService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var adminDaoObject = new adminDao()
      try {
        var getAdminLogin = await adminDaoObject.getAdminLoginDao(userData)
        if (getAdminLogin.result.length > 0) {
          if (getAdminLogin.error == 'true') {
            response.error = 'true'
            response.message = 'admin login failed'
            resolve(response)
          } else {
            var passwordHash = this.spiltPasswordHash(getAdminLogin.result[0].password)
            var hash = this.reGeneratePasswordHash(userData.password, passwordHash.salt)
            if (hash === passwordHash.hash) {
              var permission = await adminDaoObject.getAdminPermissionDao(getAdminLogin.result[0].roleId)
              // console.log(permission)
              var genToken = {}
              genToken.id = getAdminLogin.result[0].id
              genToken.name = getAdminLogin.result[0].name
              genToken.email = getAdminLogin.result[0].email
              response.error = 'false'
              response.message = 'admin login success'
              var token = await this.generateToken(genToken)
              resp.token = Buffer.from(token).toString('base64')
              resp.info = getAdminLogin.result[0]
              resp.permission = permission.result
              // resp.role = getAdminLogin.result[0].role
              // resp.id = getAdminLogin.result[0].id
              response.result = resp
              resolve(response)
            } else {
              response.error = 'true'
              response.message = 'invalid password'
              resolve(response)
            }
          }
        } else {
          response.error = 'true'
          response.message = 'invalid admin'
          resolve(response)
        }
      } catch (err) {
        console.log(err)
        response.error = 'true'
        response.message = 'OOPS Service Error'
        resolve(response)
      }
    })
  }

  this.getSettingService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var adminDaoObject = new adminDao()
      var result = await adminDaoObject.getStoreDistanceDao(request)
      // console.log(result)
      if (result.error == 'true') {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.settings = result.result
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.updateSettingService = async (request, callback) => {
    try {
      var response = {}
      var adminDaoObject = new adminDao()
      var result = await adminDaoObject.appUpdateSettingsDao(request)
      if (result.error == 'true') {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  // this.addSubAdminService = async (request, callback) => {
    this.addSubAdminService = async (request, callback) => {
    try {
      var response = {}
      var adminDaoObject = new adminDao()
      var checkEmail = await adminDaoObject.checkEmailOrMobileDao(request)
      if(checkEmail.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        if(checkEmail.data.length === 0){
          const salt = crypto.randomBytes(16).toString('base64')
          const hash = crypto.createHmac('sha512', salt).update(request.password).digest('base64')
          request.password = salt + '$' + hash
          var save = await adminDaoObject.saveSubadminDao(request)
          if (save.error) {
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
        response.error = 'true'
        response.message = 'Email Id already exists'
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getSubadminListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var adminDaoObject = new adminDao()
      var result = await adminDaoObject.getSubadminListDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.admin = result.result
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getAdminRolesListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var adminDaoObject = new adminDao()
      var result = await adminDaoObject.getAdminRolesDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.roles = result.result
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.roleByPermissionService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var adminDaoObject = new adminDao()
      var result = await adminDaoObject.roleByPermissionDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.permission = result.result
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.updatePermissionService = async (request, callback) => {
    try {
      var response = {}
      var adminDaoObject = new adminDao()
      var obj = {}
      obj.id = request.id
      obj.roleId = request.roleId
      if(request.writeOpt){
        obj.writeOpt = request.writeOpt
      }
      if(request.readOpt){
        obj.readOpt = request.readOpt
      }
      if(request.exportOpt){
        obj.exportOpt = request.exportOpt
      }
      if(request.writeOpt || request.readOpt || request.exportOpt){
        var result = await adminDaoObject.updatePermissionDao(obj)
        if (result.error) {
          response.error = 'true'
          response.message = 'OOPS DAO Exception'
        } else {
          response.error = 'false'
          response.message = 'Success'
        }
      } else {
        response.error = 'true'
        response.message = 'Unable to update the permission'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }


  this.changeAdminStatusService = async (request, callback) => {
    try {
      var response = {}
      var adminDaoObject = new adminDao()
      var result = await adminDaoObject.updateSubadminDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.deleteAdminService = async (request, callback) => {
    try {
      var response = {}
      var adminDaoObject = new adminDao()
      var result = await adminDaoObject.updateSubadminDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

}
