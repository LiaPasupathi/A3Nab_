module.exports = function () {
    const db = require('../../db.js')
  
    this.addtocart = (data) => {
      return new Promise(async function (resolve) {
        var response = {}
        db('cart')
        .insert(data)
        .then((result) => {
          response.error = 'false'
          response.result = result
        })
        .catch((error) => {
          console.log(error);
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
      })
    }
    
    this.updatecart = (data) => {
      console.log(data);
      return new Promise(async function (resolve) {
        var response = {}
        db('cart')
        .where({ id: data.id })
        .update({ })
        .then((result) => {
          response.error = 'false'
          response.result = result
        })
        .catch((error) => {
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
      })
    }
  
    this.getscartDao = (data) => {
      return new Promise(async function (resolve) {
        var response = {}
          db('orders')
            .select('orderedon as date')
            .sum('price as amt')
            .groupBy(data.orderby || 'orderedon')
            .where({ storeid: data.id })
            .then((result) => {
              response.error = 'false'
              response.result = result
            })
            .catch((error) => {
              console.log(error);
              response.error = 'true'
            })
            .finally(() => {
              resolve(response)
            })
      })
    }
  
  
  
    this.addtowishlist = (data) => {
      return new Promise(async function (resolve) {
        var response = {}
        db('wishlist')
        .insert(data)
        .then((result) => {
          response.error = 'false'
          response.result = result
        })
        .catch((error) => {
          console.log(error);
          response.error = 'true'
        })
        .finally(() => {
          resolve(response)
        })
      })
    }
  }