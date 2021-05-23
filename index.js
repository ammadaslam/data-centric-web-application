var express = require('express')
var mySQLDAO = require('./mySQLDAO')
var ejs = require('ejs')
var bodyParser = require('body-Parser')
var mongoDAO = require('./mongoDAO')

var app = express()
//body parser for post request
app.use(bodyParser.urlencoded({ extended: false }))
// create application/json parser
//var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//set engine ejs
app.set('view engine', 'ejs')


// '/' Main page of app with 3 links
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/views/list.html")

})
//Route listCountries is use to display all countries list from mysql database countries table
app.get('/listCountries', (req, res) => {
    mySQLDAO.getCountries()

        .then((result) => {
            console.log(result)
            res.render('showCountries', { countries: result })

        })
        .catch((error) => {
            res.send(error)

        })

})

//Route listCities to display all cities from mySQL city table database connection setup in mySQLDAO
app.get('/listCities', (req, res) => {
    mySQLDAO.getCities()
        .then((result) => {
            console.log(result)
            res.render('showCities', { cities: result })
        })
        .catch((error) => {
            res.send(error)

        })

})

//Route addCountry is use to add country 
app.get('/addCountry', (req, res) => {
    res.render("addCountry")

})

//Route addheadofstate 
app.get('/addheadofstate', (req, res) => {
    res.render("addHeadofState")
})
//Route editCountry
app.get('/editCountry', (req, res) => {
    res.render("editCountry")
})
//Route cityDetails is use to display cityDetails form
app.get('/cityDetails', (req, res) => {
    res.render("cityDetails")
})


//listening for post request
app.post('/addCountry', urlencodedParser, (req, res) => {
    mySQLDAO.addNewCountryForm(req.body.code, req.body.name, req.body.details)
    res.redirect("listCountries")

    // .then((result) => {
    //     res.redirect("listCountries")

    // })
    // .catch((error) => {
         
    //     if (error.message.includes("1062")) {
    //         res.send("Error: Country with ID: " + req.body.code + "already exists")
    //     } else {
    //         res.send(error.message)
    //     }
        

    // })

})

//Route listHeadofstate showing headofstate collection from mongoDB

app.get('/listHeadOfState', (req, res) => {
    mongoDAO.getHeadofstate()

        .then((result) => {
            console.log(result)
            res.render('showHeadOfState', { headofstates: result })

        })
        .catch((error) => {
            res.send(error)

        })

})



//route addheadofstate to add new headOfstate
app.post('/addheadofstate', (req, res) => {

    mongoDAO.addHeadofstate(req.body._id, req.body.headOfState)
        .then((result) => {
            res.redirect("/listHeadOfState")


        })
        .catch((error) => {
            if (error.message.includes("11000")) {
                res.send("Error: Employee with ID: " + req.body._id + "already exists")
            } else {
                res.send(error.message)
            }

        })

})



app.listen(3004, () => {
    console.log("Listening on port 3004")
})