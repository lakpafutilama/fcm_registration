# fcm_registration
external fcm registration

## This is registration service for firebase Cloud Messaging (FCM) used to register a new user and read, update or delete the user's data.

## Technologies
  * NodeJS
  * Express
  * MongoDB
  * Docker 

## POSTMAN
  > Following table show the url for CRUD operation.

|HTTP Method|URL|Description|
|---|---|---|
|`POST`|http://localhost:3000/external/fcm/registration/{ownership} | Register new user |
|`PUT`|http://localhost:3000/external/fcm/registration/{ownership}/{username} | Update User by username |
|`GET`|http://localhost:3000/external/fcm/registration/{ownership}/{username} | Get User by username |
|`DELETE`|http://localhost:3000/external/fcm/registration/{ownership}/{username} | Delete User by username |
|`GET`|http://localhost:3000/external/fcm/registration/{ownership} | Get All Users registered in this ownership |
>Note: Ownership can be one among ["worldlink", "vianet", "cgnet"] and username refers to client_name given during registration.

## CRUD operation

## POST Request URL to register new user
  >(http://localhost:3000/external/fcm/registration/worldlink)

  - In this case, worldlink is ownership of a company name and become a collection name and then user data is stored inside it.

### Example

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
   
## GET Request URL to register new user
  >(http://localhost:3000/external/fcm/registration/worldlink)

  - In this case, worldlink is ownership of a company name and we get user datas stored inside it.

### Example

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

## GET Request URL to register new user
  >(http://localhost:3000/external/fcm/registration/worldlink/lakpa)

  - In this case, worldlink is ownership of a company name and we get user datas of usernamestored inside it.

### Example

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
  >(http://localhost:3000/external/fcm/registration/worldlink/lakpa)

  - In this case, worldlink is ownership of a company name and we can update user data of username lakpa.

### Example

    Response
    {
    "message": "OK",
    "error": false,
    "code": 200,
    "result": "lakpa is updated."
    }

## DELETE Request URL to register new user
  >(http://localhost:3000/external/fcm/registration/worldlink/lakpa)

  - In this case, worldlink is ownership of a company name and we can update user data of username lakpa.

### Example

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
