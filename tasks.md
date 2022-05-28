1. Hello world


2. API for cars

GET /cars
    - List of all cars

3. Set up git and push to Github

4. API to get details of one car

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
        
5. Create a new api endpoint that creates a new car

POST /cars
Post data (json): 
{
    "name": "Maruti Ritz",
    "mileage": 100032
}

Response should be:
{
    "result": "success"
}

To test this, use Postman to create POST requests.

