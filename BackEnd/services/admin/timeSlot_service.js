module.exports = function () {
  var async = require('async')
  var timeSlotDao = require('../../dao/admin/timeSlot_dao')

  this.getTimeSlotService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var timeSlotObject = new timeSlotDao()
      var getDays = await timeSlotObject.getDaysDao()
      if (getDays.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        var dayList = getDays.data
        var length = dayList.length
        async.eachOfSeries(dayList, async function (item, index) {
          var getSlot = await timeSlotObject.getSlotListDao(item)
          dayList[index].slot = getSlot.data
          if (--length === 0) {
            resp.timeSlot = dayList
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
            callback(response)
          }
        })
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.addTimeSlotService = async (request, callback) => {
    try {
      var response = {}
      var timeSlotObject = new timeSlotDao()
      var from = request.fromTime.split(":")
      var to = request.toTime.split(":")
      request.timeText = from[0]+'-'+to[0]
      await timeSlotObject.checkTimeExistsDao(request)
        .then(result => {
          if (result.data.length === 0) {
            return timeSlotObject.addNewTimeSlotDao(request)
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

  this.editTimeSlotService = async (request, callback) => {
    try {
      var response = {}
      var timeSlotObject = new timeSlotDao()
      var from = request.fromTime.split(":")
      var to = request.toTime.split(":")
      request.timeText = from[0]+'-'+to[0]
      await timeSlotObject.editcheckTimeExistsDao(request)
        .then(result => {
          if (result.data.length === 0) {
            return timeSlotObject.updateTimeSlotDao(request)
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

  this.deleteTimeSlotService = async (request, callback) => {
    try {
      var response = {}
      var timeSlotObject = new timeSlotDao()
      var result = await timeSlotObject.removeTimeSlotDao(request)
      if (result.error) {
        response.error = true
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
