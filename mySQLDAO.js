
var mysql = require('promise-mysql')



//pool connection for multiple users to acces resourse
var pool
mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'geography'
})
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    });
//Function country will return  countries list table from mysql database 
var getCountries = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from country')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })

    })
}

//Function Cities will return  Cities list table from mysql database 
var getCities = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from city')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })

    })
}

//GET city  with specific id
var getCity = function (cty_code) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'select * from city where cty_code = ?',
            values: [cty_code]

        }
            pool.query(myQuery)
                .then((result) => {
                    resolve(result)

                })
                .catch((error) => {     
                    reject(error)

                })

        })
        }


        // //add country
        // var addCountry = function (co_code,co_name,co_details) {
        //     return new Promise((resolve, reject) => {
        //         var myQuery = {
        //             sql: 'INSERT INTO country where (co_code,co_name,co_details) = ?',
        //             values: [co_code.req.body,co_name.req.body,co_details.req.body]
        
        //         }
        //             pool.query(myQuery)
        //                 .then((result) => {
        //                     resolve(result)
        
        //                 })
        //                 .catch((error) => {     
        //                     reject(error)
        
        //                 })
        
        //         })
        //         }

        var addNewCountryForm = function (code,name,details) {
            console.log('pool query called')
            return new Promise((resolve, reject) => {
                pool.query('INSERT INTO country SET ?', {co_code: code, co_name: name, co_details: details}, function (error, results, fields) {
                      // When done with the connection, release it.
                   // pool.release();
                    if (error) throw error;
                    console.log(results.insertId);
                  })
                  pool.release()
                    .then((result) => {
                        resolve(result)
                        
        
                    })
                    .catch((error) => {
                        reject(error)
                        console.log(sqlMessage)
                        //reject(sqlMessage)

        
                    })
        
            })
        }







module.exports = { getCountries, getCities, getCity,addNewCountryForm}

