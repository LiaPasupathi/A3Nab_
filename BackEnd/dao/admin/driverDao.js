module.exports = function () {
  const db = require('../../db.js')
  this.addNewCarDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cars')
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

  this.getCarListDao = (data, id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cars')
        .select('cars.id', 'firstName', 'lastName', 'driver.carId as crId', 'drId', 'latitude', 'longitude', 'cars.carID', 'driverId', 'carModel', 'carImage', 'licenseNumber', 'lastDateOilChange', 'lastDateGasRefill', 'expirationDate', 'currentMileage', 'startingMileage', 'carStatus')
        .leftJoin('driver', 'cars.driverId', '=', 'driver.id')
        .where('deleteStatus', 0)
        .orderBy('cars.id', 'desc')
        .modify(function (queryBuilder) {
          if(id){
            queryBuilder.where('cars.id', id)
          }
          if(data.status == 'UNASSIGN'){
            queryBuilder.whereNull('driverId')
          }
          if(data.status == 'ASSIGN'){
            queryBuilder.orWhereNotNull('driverId')
          }
        })
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
  this.admincarDamageListDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('carDamages')
        .select('id', 'DamageReason')
        .where({ 'carId': id })
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
  this.adminGetMaintenanceDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverMaintenance')
        .select('driverMaintenance.id', 'firstName', 'lastName', 'drId', 'lastDateOilChange', 'lastDateGasRefill', 'expirationDate',  'driverMaintenance.currentMileage', 'startingMileage', 'nameList as maintenanceName', 'maintenanceAmount', 'message', 'driverMaintenance.createdAt')
        .innerJoin('maintenanceList', 'driverMaintenance.maintenanceId', '=', 'maintenanceList.id')
        .innerJoin('driver', 'driverMaintenance.driverId', '=', 'driver.id')
        .innerJoin('cars', 'driverMaintenance.carId', '=', 'cars.id')
        .where({ 'driverMaintenance.carId': id })
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

  this.getreturnCarListDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('returnCar')
        .select('returnCar.id', 'firstName', 'lastName', 'drId', 'startingMileage', 'lastDateOilChange', 'lastDateGasRefill', 'expirationDate', 'returnCar.carMileage as returnMileage', 'returnCar.createdAt as date')
        .innerJoin('driver', 'returnCar.driverId', '=', 'driver.id')
        .innerJoin('cars', 'returnCar.carId', '=', 'cars.id')
        .where({ 'returnCar.carId': id })
        .then((result) => {
          // console.log(result)
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

  this.returnDamageListDa0 = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('carDamages')
       .select('id', 'DamageReason', 'carMileage', 'createdAt')
        .where('returnId', id)
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

  this.updateCarDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('cars')
        .where('id', data.carId)
        .update('driverId', data.driverId)
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

  this.updateDriverDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .where('id', data.driverId)
        .update({ 'newCar': 1, 'carId': data.carId })
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

  this.checkDriverMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .orWhere('mobileNumber', data.mobileNumber)
        .orWhere('email', data.email)
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

  this.saveNewDriverDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
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

  this.checkFloatingCashDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverFloatingCash')
        .select('driverId')
         .where('driverId', id)
         .where('cashType', 'ADMIN')
        .groupBy('driverId')
        .sum('amount as amt')
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

  this.getDriverListDao = (data, id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .select('driver.id', 'driver.carId', 
        'dob', 'isAccepted', 'drId', 'carModel', 
        'firstName', 'lastName', 'email', 'profilePic', 
        'countryCode', 'mobileNumber', 'gender', 'IDNumber', 
        'floatingCash', 'latitude', 'longitude', 'driverActive')
        .leftJoin('cars', 'driver.carId', '=', 'cars.id')
        .where('isDeleteDriver', 0)
        .orderBy('driver.id', 'desc')
        .modify(function (queryBuilder) {
          if (data.driverActive) {
            queryBuilder.where('driverActive', data.driverActive)
          }
          if(data.isComplete == '1'){
            queryBuilder.whereNotNull('driver.carId')
          }
          if (data.id) {
            queryBuilder.where('driver.id', id)
          }
        })
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


  this.getDriverOrderListDao = (data, id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverOrders')
        .select('id','driverId', 'isComplete')
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

  this.updateFloatingCashDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverFloatingCash')
       .insert({ driverId: data.id, cashType: 'ADMIN', amount: data.amount  })
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

  this.assignDriverListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .select('driver.id', 'driver.carId', 'drId', 'isAccepted', 'firstName', 'lastName', 'email', 'profilePic', 'countryCode', 'mobileNumber', 'gender', 'IDNumber', 'latitude', 'longitude', 'driverActive')
        // .leftJoin('cars', 'driver.carId', '=', 'cars.id')
        // .where('isDeleteDriver', 0)
        .where({ 'isDeleteDriver': 0, 'isAccepted': 0, 'driverActive': 1 })
        .whereNull('carId')
        .orderBy('driver.id', 'desc')
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

  this.editcheckDriverMobileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.raw('select * from driver where ( email=? OR  mobileNumber=? ) AND id != ?', [data.email, data.mobileNumber, data.id])
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

  this.updateDriverProfileDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driver')
        .where('id', data.id)
        .update(data)
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
