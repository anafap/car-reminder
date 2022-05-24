const express = require("express");
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

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/cars", function (req, res) {
    res.json(cars);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
