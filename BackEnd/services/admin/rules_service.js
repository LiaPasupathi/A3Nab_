module.exports = function () {
  var async = require('async')
  var rulesDao = require('../../dao/admin/rules_dao')

  this.newRulesService = async (request, callback) => {
    try {
      var response = {}
      var rulesDaoObject = new rulesDao()
      var object = {}
      object.title = request.title
      object.triggerName = request.triggerName
      object.startDate = request.startDate
      object.endDate = request.endDate
      var rulesOptions = JSON.parse(request.options)
      var result = await rulesDaoObject.saveNewRuleDao(object, rulesOptions)
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

  this.rulesListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var rulesDaoObject = new rulesDao()
      var result = await rulesDaoObject.rulesListDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.rules = result.data
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

  this.changeRuleStatusService = async (request, callback) => {
    try {
      var response = {}
      var rulesDaoObject = new rulesDao()
      var result = await rulesDaoObject.updateruleStatusDao(request)
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
