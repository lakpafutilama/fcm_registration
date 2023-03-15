# fcm_registration
external fcm registration

### This is registration service for Firebase Cloud Messaging (FCM) used to register a new user and read, update or delete the user's data from the database.

## Technologies
  * NodeJS
  * Express
  * MongoDB
  * Docker 

## POSTMAN
  > Following table show the URL for CRUD operation.

|Operation|URL|Description|
|---|---|---|
|`POST`|http://localhost:3000/external/fcm/registration/{ownership} | Register new user |
|`PUT`|http://localhost:3000/external/fcm/registration/{ownership}/{username} | Update User by username |
|`GET`|http://localhost:3000/external/fcm/registration/{ownership}/{username} | Get User by username |
|`DELETE`|http://localhost:3000/external/fcm/registration/{ownership}/{username} | Delete User by username |
|`GET`|http://localhost:3000/external/fcm/registration/{ownership} | Get All Users registered in this ownership |
>Note: Ownership can be one among the list: ["worldlink", "vianet", "cgnet"] and username refers to client_name given during registration.

## CRUD operation

## POST Request URL to register new user

  - In this case, worldlink is ownership of a company name which become a collection name and then user data is stored inside this collection.

  POST http://localhost:3000/external/fcm/registration/worldlink
  
    Request
    {
     "registration_id": "112",
     "client_username": "lakpa",
     "ip": "192.168.1.259",
     "status": 2,
     "app_version": 220,
     "app_version_code": "2.2.2",
     "device_os": "android",
     "device_name": "demo"
    }
    Response
    {
    "message": "OK",
    "error": false,
    "code": 200,
    "result": "lakpa is registered."
    }
   
## GET Request URL

  - In this case, worldlink is ownership of a company name and we get all users data stored inside this collection.
  
  GET http://localhost:3000/external/fcm/registration/worldlink
    
     Response
     {
     "message": "OK",
     "error": false,
     "code": 200,
     "result": [
         {
             "_id": "64105e9184602df88d3e90f3",
             "client_username": "raghav",
             "device_id": "a374-29e8-42d4-97c4-4f84",
             "device_name": "google pixel",
             "registration_id": 123345,
             "ip": "192.168.10.1",
             "status": 1,
             "app_version_code": "168.192",
             "device_os": "Android",
             "createdAt": "2023-03-14T11:46:25.704Z",
             "updatedAt": "2023-03-14T11:46:25.704Z",
             "__v": 0
         },
         {
             "_id": "64106006959dc52dbe86c029",
             "registration_id": 112,
             "client_username": "lakpa",
             "ip": "192.168.1.259",
             "status": 2,
             "app_version": 220,
             "app_version_code": "2.2.2",
             "device_os": "android",
             "device_name": "demo",
             "createdAt": "2023-03-14T11:52:38.894Z",
             "updatedAt": "2023-03-14T11:52:38.894Z",
             "__v": 0
         }
      ]
     }

## GET Request URL

  - In this case, worldlink is ownership of a company name and we get data of username lakpa stored inside this collection.
  
  Get http://localhost:3000/external/fcm/registration/worldlink/lakpa
  
    Response
    {
    "message": "OK",
    "error": false,
    "code": 200,
    "result": {
            "_id": "64106006959dc52dbe86c029",
            "registration_id": 112,
            "client_username": "lakpa",
            "ip": "192.168.1.259",
            "status": 2,
            "app_version": 220,
            "app_version_code": "2.2.2",
            "device_os": "android",
            "device_name": "demo",
            "createdAt": "2023-03-14T11:52:38.894Z",
            "updatedAt": "2023-03-14T11:52:38.894Z",
            "__v": 0
        }
     }

## PUT Request URL to register new user

  - In this case, worldlink is ownership of a company name and we can update user data of username lakpa.
  
  PUT http://localhost:3000/external/fcm/registration/worldlink/lakpa
  
    Request
    {
     "registration_id": "113",
     "client_username": "lakpa",
     "ip": "192.168.1.1",
     "status": 2,
     "app_version": 220,
     "app_version_code": "2.2.2",
     "device_os": "android",
     "device_name": "demo"
    }
    Response
    {
    "message": "OK",
    "error": false,
    "code": 200,
    "result": "lakpa is updated."
    }

## DELETE Request URL to register new user

  - In this case, worldlink is ownership of a company name and we can delete user data of username lakpa.

  DELETE http://localhost:3000/external/fcm/registration/worldlink/lakpa
  
    Response
    {
    "message": "OK",
    "error": false,
    "code": 200,
    "result": "lakpa has been deleted."
    }

### Developer: Lakpa Futi Lama

### Contact: lakpa.lama@worldlink.com.np

### Thank You
