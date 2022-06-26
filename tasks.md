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

6. Integrate a local database (Nedb) and update existing APIs

7. Create a new file that uses SQLite instead of Nedb. (index-sqlite.js)

8. New API to update car name and mileage
    PATCH /cars/1
    {
        "name": "Polo GT TSI",
        "mileage": 90000
    }
    Also add a timestamp for each car with the name "mileage_updated_at".

9. Create reminders
    Allow user to create reminders for each car:
        - Reminder name (Eg. Insurance Renewal)
        - Reminder period
            - Every X period (days / months / year) starting from Y date. 
                (Eg. Insurance Renewal every year starting from 22-Jul-2022)
            - Every X kilometer starting from Y kilometer
                (Eg. Tyres to be changed every 40,000 km)

10. List of upcoming actions for each car.
    - Tyre change: In 14,950 km
    - Insurance renewal: Due by 22-Jul-2022
    - Wheel Alignment: In 1,950 km
    - Regular Service: In 8,850 km

11. Build UI mockups for this (Figma), using existing template

12. Make a frontend web app (Vue.js, Bootstrap) that uses the APIs above.

13. Make a frontend web app (React, Ant Design) that uses the APIs above.

14. Make a mobile app (Flutter) that uses the APIs above.

15. Make a mobile app (React Native) that uses the APIs above.

16. Make a mobile app (Java / Kotlin) that uses the APIs above.

17. Rewrite the API in Python / Flask.

18. Deploy the application on a cloud server (Digital Ocean)

19. Publish the application on Google Play.

20. Launch the product on Product Hunt.
