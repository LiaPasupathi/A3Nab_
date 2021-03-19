module.exports = function () {
  const db = require('../../db.js')

  this.addFAQDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('faq')
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
  this.editfaqDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('faq')
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

  this.getFAQDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('faq')
        .where('type', data.type)
        .orderBy('faq.id', 'desc')
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

  this.delFAQDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('faq')
        .where('id', data.id)
        .del()
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

  this.updatePrivacyDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('policyNcondition')
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

  this.getPolicyNconditionDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('policyNcondition')
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

  this.checkfaqCategoryDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('faqCategory')
        .where('categoryName', data.categoryName)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          response.error = true
          reject(error)
        })
    })
  }

  this.addfaqCategoryDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('faqCategory')
        .insert(data)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          response.error = true
          reject(error)
        })
    })
  }

  this.editcheckfaqCategoryDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('faqCategory')
        .where('categoryName', data.categoryName)
        .where('id', '!=', data.id)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          response.error = true
          reject(error)
        })
    })
  }

  this.editfaqCategoryDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('faqCategory')
        .where('id', data.id)
        .update(data)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          response.error = true
          reject(error)
        })
    })
  }

  this.getfaqCategoryDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('faqCategory')
        .where('isDelete',0)
        .orderBy('id', 'desc')
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          response.error = true
          reject(error)
        })
    })
  }

}
