module.exports = function() {
    var mysqlExecute = require('../connection.js')

    this.getStoreDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id,storeName,storeImage,countryCode,mobileNumber,profilePic FROM users WHERE mobileNumber = ? AND countryCode = ?"
                var queryRequest = [data.mobileNumber, data.countryCode]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }
}