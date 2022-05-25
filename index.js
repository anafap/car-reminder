const express = require("express");
const { arrayBuffer } = require("stream/consumers");
const app = express();
const port = 3000;

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

function search(carid, cars) {
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].id === carid) {
            return cars[i];
        }
    }
}

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
app.get("*", function (req, res) {
    res.send("Sorry, this is an invalid URL.");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
