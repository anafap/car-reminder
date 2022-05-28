const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/cars", function (req, res) {
    res.json(cars);
});

app.get("/cars/:id", function (req, res) {
    const id = req.params.id;
    var searchIndex = -1;
    cars.forEach((element, index) => {
        if (element.id === parseInt(id)) {
            searchIndex = index;
        }
    });
    if (searchIndex != -1) {
        res.json(cars[searchIndex]);
    } else {
        res.json({ result: "fail" });
    }
});

app.post("/cars", function (req, res) {
    const maxId = Math.max(
        ...cars.map(function (element) {
            return element.id;
        })
    );

    cars.push({
        id: maxId + 1,
        name: req.body.name,
        mileage: req.body.mileage,
    });
    res.json({ result: "success" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
