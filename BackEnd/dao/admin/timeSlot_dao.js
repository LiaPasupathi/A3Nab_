module.exports = function () {
  const db = require('../../db.js')

  this.getDaysDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('days')
        .select('days.id', 'dayName')
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

  this.getSlotListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('deliveryTime')
        .select('deliveryTime.id', 'fromTime', 'toTime', 'maxOrder', 'status')
        .where({ dayId: data.id, timeDelete: 0 })
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

  this.checkTimeExistsDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('deliveryTime')
        .whereRaw('TIME(fromTime)= TIME(?) AND TIME(toTime) = TIME(?)', [data.fromTime, data.toTime])
        .where('timeDelete', 0)
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

  this.editcheckTimeExistsDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('deliveryTime')
        .whereRaw('TIME(fromTime)= TIME(?) AND TIME(toTime) = TIME(?)', [data.fromTime, data.toTime])
        .where('timeDelete', 0)
        .where('id', '!=', data.id)
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

  this.addNewTimeSlotDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('deliveryTime')
        .insert(data)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
            console.log(error)
          reject(error)
        })
    })
  }

  this.updateTimeSlotDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('deliveryTime')
        .where('id', data.id)
        .update(data)
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

  this.removeTimeSlotDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('deliveryTime')
        .where({ id: data.id, dayId: data.dayId })
        .update('timeDelete', 1)
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


}
