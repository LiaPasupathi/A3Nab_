module.exports = function(app, validator) {
    var userPath = '/provider'
    require('../utils/error.js')()
    var storeController = require('../controllers/store_controller.js')

    app.post(userPath + '/login', [
        validator.check('countryCode').isLength({ min: 1, max: 4 }).withMessage('INVALID: $[1], Country Code'),
        validator.check('mobileNumber').isLength({ min: 7, max: 18 }).withMessage('INVALID: $[1], Mobile Number')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var storeControllerObject = new storeController()
            storeControllerObject.loginUserController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.send(message)
                })
            })
        }
    })

    app.post(userPath + '/createAccount', [
        validator.check('storeName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Store Name'),
        validator.check('countryCode').isLength({ min: 1, max: 4 }).withMessage('INVALID: $[1], Country Code'),
        validator.check('mobileNumber').isLength({ min: 7, max: 18 }).withMessage('INVALID: $[1], Mobile Number')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var storeControllerObject = new storeController()
            storeControllerObject.createAccountUserController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.send(message)
                })
            })
        }
    })

    app.post(userPath + '/updateDeviceToken', app.auth, [
        validator.check('os').isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1], OS'),
        validator.check('fcmToken').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Firebase Token')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        request.body.id = request.params.auth.id
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var storeControllerObject = new storeController()
            storeControllerObject.updateDeviceTokenController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.send(message)
                })
            })
        }
    })

}