module.exports = function () {
  var async = require('async')
  var faqDao = require('../../dao/admin/faq_dao')

  this.addfaqServices = async (request, callback) => {
    try {
      var response = {}
      var faqDaoObject = new faqDao()
      var result = await faqDaoObject.addFAQDao(request)
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

  this.editfaqServices = async (request, callback) => {
    try {
      var response = {}
      var faqDaoObject = new faqDao()
      var result = await faqDaoObject.editfaqDao(request)
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

  this.getfaqServices = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var faqDaoObject = new faqDao()
      var result = await faqDaoObject.getFAQDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.faq = result.data
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

  this.delfaqService = async (request, callback) => {
    try {
      var response = {}
      var faqDaoObject = new faqDao()
      var result = await faqDaoObject.delFAQDao(request)
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

  this.addPolicyNconditionService = async (request, callback) => {
    try {
      var response = {}
      var faqDaoObject = new faqDao()
      var object = {}
      if(request.type == 'POLICY'){
        object.privacyPolicy = request.text
      } else {
        object.termsNcondition = request.text
      }
      var result = await faqDaoObject.updatePrivacyDao(object)
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

  this.getPolicyNconditionService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var faqDaoObject = new faqDao()
      var result = await faqDaoObject.getPolicyNconditionDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.privacy = result.data
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

  this.addfaqCategoryService = async (request, callback) => {
    try {
      var response = {}
      var faqDaoObject = new faqDao()
      await faqDaoObject.checkfaqCategoryDao(request)
        .then(result => {
          if (result.data.length === 0) {
            return faqDaoObject.addfaqCategoryDao(request)
          } else {
            return { error: true }
          }
        }).then(final => {
          if (!final.error) {
            response.error = 'false'
            response.message = 'Success'
          } else {
            response.error = 'true'
            response.message = 'Duplicate data'
          }
          callback(response)
        })
        .catch(error => {
          console.log(error)
          response.error = 'true'
          response.message = 'OOPS DAO Exception'
          callback(response)
        })
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.editfaqCategoryService = async (request, callback) => {
    try {
      var response = {}
      var faqDaoObject = new faqDao()
      await faqDaoObject.editcheckfaqCategoryDao(request)
        .then(result => {
          if (result.data.length === 0) {
            return faqDaoObject.editfaqCategoryDao(request)
          } else {
            return { error: true }
          }
        }).then(final => {
          if (!final.error) {
            response.error = 'false'
            response.message = 'Success'
          } else {
            response.error = 'true'
            response.message = 'Duplicate data'
          }
          callback(response)
        })
        .catch(error => {
          console.log(error)
          response.error = 'true'
          response.message = 'OOPS DAO Exception'
          callback(response)
        })
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.getfaqCategoryService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var faqDaoObject = new faqDao()
      var result = await faqDaoObject.getfaqCategoryDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.category = result.data
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

  this.updatefaqCategoryStatusService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var faqDaoObject = new faqDao()
      var result = await faqDaoObject.editfaqCategoryDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.category = result.data
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
