1. Hello world


2. API for cars

GET /cars
    - List of all cars

GET /cars/:id
    - Eg: /cars/1
    - Response:
        {
            "id": 1,
            "name": "Polo GT",
            "mileage": 65000
        }

    - If no such id found, return:
        {
            "result": "fail",
            "message": "No such car"
        },
        HTTP status code 404.

