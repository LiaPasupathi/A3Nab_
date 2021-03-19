module.exports = function () {
  const db = require('../../db.js')

  this.saveNewRuleDao = (data, options) => {
    return new Promise(async function (resolve) {
      var response = {}
      return db.transaction(function (t) {
        return db('rules')
          .transacting(t)
          .insert(data)
          .then(function (response) {
            return Promise.all(options.map((item) => {
              // console.log(item)
              return db('rulesOptions')
                .transacting(t)
                .insert({ rulesId: response[0], walletAmount: item.walletAmount, points: item.points, type: item.type, notifyTitle: item.notifyTitle, notifyMessage: item.notifyMessage })
            }))
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

  this.rulesListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('rules')
        .where({ status: data.status })
        .where('isDelete', 0)
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

  this.updateruleStatusDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('rules')
        .where({ id: data.id })
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

}
