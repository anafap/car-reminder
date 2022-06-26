const express = require("express");
var bodyParser = require("body-parser");
var Datastore = require("nedb");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const carsDb = new Datastore("database.db");
carsDb.loadDatabase();
carsDb.find({}, function (err, docs) {
    if (docs.length === 0) {
        const cars = [
            {
                id: 1,
                name: "Polo GT",
                mileage: 65000,
            },
            {
                id: 2,
                name: "Skoda Yeti",
                mileage: 50000,
            },
        ];
        carsDb.insert(cars, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Inserted sample data of ${cars.length} cars`);
            }
        });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/cars", function (req, res) {
    res.send("starting");
    /* carsDb.find({}, { _id: 0 }, function (err, cars) {
        if (err) {
            return res.status(500).json({
                result: "fail",
                message: "Database error",
            
            });
        }
        res.send("in db");
        console.log("success");
        res.json(cars);
    }); */
    carsDb.find({}, { _id: 0 }, function (err, cars){
        res.json(cars);
    });
    /* carsDb.find({}, function (err, docs) {
        res.send("inside another find ");
    }); */
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
