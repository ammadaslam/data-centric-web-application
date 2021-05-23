
const MongoClient = require('mongodb').MongoClient;

//connection url
const url = 'mongodb://localhost:27017';

const dbName = 'headsOfStateDB'
const collName = 'headsOfState'

var headsOfStateDB
var headsOfState


MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})

.then((client) => {
    headsOfStateDB =  client.db(dbName)
    headsOfState =   headsOfStateDB.collection(collName) 

})
.catch((error) => {
    console.log(error)

})
//getting headofstate collection from mongodb 
var getHeadofstate = function() {

    return new Promise((resolve,reject) =>{
        
       var cursor = headsOfState.find()
        cursor.toArray()
        .then((documents) => {
            console.log(documents)
            resolve(documents)

        })
        .catch((error) => {

        })

    })

}

var addHeadofstate = function(_id,headOfState){
    return new Promise((resolve, reject) => {
        console.log(_id)
        headsOfState.insertOne({"_id":_id, "headOfState":headOfState})
        .then((result) =>{
            resolve(result)

        })
        .catch((error)=>{
            console.log(error)
           reject(error)
        })

    })
}



module.exports = {getHeadofstate,addHeadofstate}