module.exports = function () {
  var async = require('async')
  var exportDataDao = require('../../dao/admin/export_dao')

  this.exportDataServiceList = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var exportDataObject = new exportDataDao()
      Promise.all([
        exportDataObject.exportUserListDao(request),
        exportDataObject.exportStoreListDao(request),
        exportDataObject.exportDriverListDao(request),
        exportDataObject.exportProductListDao(request),
        exportDataObject.exportCarListDao(request),
        exportDataObject.exportVendorListDao(request),
        exportDataObject.exportSupportListDao(request),
        exportDataObject.exportOrdersListDao(request)
      ]).then(result => {
        //   console.log(result)
        resp.users = result[0].data
        resp.store = result[1].data
        resp.driver = result[2].data
        resp.product = result[3].data
        resp.cars = result[4].data
        resp.vendor = result[5].data
        resp.support = result[6].data
        resp.orders = result[7].data

        response.error = 'false'
        response.message = 'Success'
        response.data = resp
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
}
