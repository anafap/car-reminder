const express = require("express");
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require("body-parser");
const DBSOURCE = "carsDb.sqlite";
var time = require('express-timestamp');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(time.init);

process.env.TZ = "Asia/Kolkata";

app.get("/", (req, res, next) => {
    res.json({ message: "Ok" });
});

let carsDb = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the SQlite database. ");
        carsDb.run(
            "CREATE TABLE cars (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, mileage number)",
            (err) => {
                if (err) {
                    console.log("table already created ");
                } else {
                    console.log("table just created");
                    var insert =
                        "INSERT INTO cars (name, mileage) values (?,?)";
                    carsDb.run(insert, ["Polo", "25000"]);
                    carsDb.run(insert, ["Yeti", "30000"]);
                }
            }
        );
    }
});

app.get("/cars", (req, res, next) => {
    var sql = "select * from cars ";
    var params = [];
    carsDb.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            cars: rows,
        });
    });
});

app.get("/cars/:id", (req, res, next) => {
    var sql = "select * from cars where id = ?";
    var params = [req.params.id];
    carsDb.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            car: row,
        });
    });
});

app.post("/cars", (req, res, next) => {
    var errors = [];
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (!req.body.mileage) {
        errors.push("No mileage specified");
    }
    if (errors.length) {
        res.status(400).json({ error: errors.join(",") });
        return;
    }
    var cars = {
        name: req.body.name,
        mileage: req.body.mileage,
    };
    var sql = "INSERT INTO cars (name, mileage) VALUES (?,?)";
    var params = [cars.name, cars.mileage];
    carsDb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            cars: cars,
            id: this.lastID,
        });
    });
});

app.patch("/cars/:id", (req, res, next) => {
    var moment = req.timestamp;
    var car = {
        name: req.body.name,
        mileage: req.body.mileage,
    };
    var update = `UPDATE cars SET name=?, mileage = ? WHERE id = ?`;
    var inputData = [ car.name, car.mileage, req.params.id];
    carsDb.run(update, inputData, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(400).json({ error: res.message });
            return;
        }
        res.json({
            message: "success",
            car: car,
            updated_at: moment.tz("Asia/Kolkata").format(),
        });
        
    
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
