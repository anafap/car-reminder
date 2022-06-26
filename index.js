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
    carsDb.find({}, { _id: 0 }, function (err, cars) {
        if (err) {
            return res.status(500).json({
                result: "fail",
                message: "Database error",
            });
        }
        console.log("get cars success");
        res.json(cars);
    });
});

app.get("/cars/:id", function (req, res) {
    const carId = parseInt(req.params.id);
    carsDb.find({ id: carId }, { _id: 0 }, function (err, cars) {
        if (err) {
            return res.status(500).json({
                result: "fail",
                message: "Database error",
            });
        }

        if (cars.length === 0) {
            return res.status(404).json({
                result: "fail",
                message: "No such car",
            });
        }
        res.json(cars[0]);
    });
});

app.post("/cars", function (req, res) {
    /*  const maxId = Math.max(
        ...cars.map(function (element) {
            return element.id;
        })
    );

    cars.push({
        id: maxId + 1,
        name: req.body.name,
        mileage: req.body.mileage,
    });
    carsDb.insert(cars);
    res.json({ result: "success" }); */

    carsDb
        .find({})
        .sort({ id: -1 })
        .limit(1)
        .projection({ id: 1, _id: 0 })
        .exec(function (err, cars) {
            console.log("cars", cars[0]);
            const maxId = cars[0].id;
            console.log("maxid ", maxId);
            const newCar = {
                id: maxId + 1,
                name: req.body.name,
                mileage: req.body.mileage,
            };

            carsDb.insert(newCar, function (err, cars) {
                console.log("insertion success");
            });
        });



    res.json({ result: "success" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
