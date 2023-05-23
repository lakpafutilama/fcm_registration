# fcm_registration

external fcm registration

> This is registration service for Firebase Cloud Messaging (FCM) used to register a new user and read, update or delete the user's data from the database.

## Technologies

- NodeJS
- Express
- MongoDB
- Docker

## POSTMAN

Following table show the URL for CRUD operation.

| Operation | URL                                                                    | Description                                |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------ |
| `POST`    | http://localhost:3000/external/fcm/registration/{ownership}            | Register new user                          |
| `PUT`     | http://localhost:3000/external/fcm/registration/{ownership}/{username} | Update User by username                    |
| `GET`     | http://localhost:3000/external/fcm/registration/{ownership}/{username} | Get User by username                       |
| `DELETE`  | http://localhost:3000/external/fcm/registration/{ownership}/{username} | Delete User by username                    |
| `GET`     | http://localhost:3000/external/fcm/registration/{ownership}/all        | Get All Users registered in this ownership |
| `POST`    | http://localhost:3000/external/fcm/registration/{ownership}/post       | Register 50K user data                     |

> Note: Ownership can be one among the list: ["worldlink", "vianet", "cgnet"] and username refers to client_name given during registration.

## Examples

### POST Request URL to register new user

In this case, worldlink is ownership of a company name which become a collection name and then user data is stored inside this collection.

POST http://localhost:3000/external/fcm/registration/worldlink

Request

```json
{
  "registration_id": "1",
  "client_username": "lakpa",
  "device_os": "Android",
  "device_name": "Samsung",
  "app_version": "2023012016",
  "app_version_code": "",
  "logged_cell_number": "9803011321",
  "enable": "y",
  "blacklist": "n"
}
```

Response

```json
{
  "message": "OK",
  "error": false,
  "code": 200,
  "result": "lakpa is registered."
}
```

### GET Request URL

In this case, worldlink is ownership of a company name and we get all users data stored inside this collection.

GET http://localhost:3000/external/fcm/registration/worldlink/all

Response

```json
{
  "message": "OK",
  "error": false,
  "code": 200,
  "result": [
    {
      "_id": "6417b8dd4f608d599b79b6cd",
      "registration_id": "1",
      "client_username": "lakpa",
      "device_os": "Android",
      "device_name": "Samsung",
      "app_version": "2023012016",
      "app_version_code": "",
      "logged_cell_number": "9803011321",
      "enable": "y",
      "blacklist": "n",
      "createdAt": "2023-03-20T01:37:33.962Z",
      "updatedAt": "2023-03-20T01:37:33.962Z",
      "__v": 0
    },
    {
      "_id": "6417ba084f608d599b79b6d0",
      "registration_id": "2",
      "client_username": "raghav",
      "device_os": "IOS",
      "device_name": "",
      "app_version": "202301218",
      "app_version_code": "",
      "logged_cell_number": "9803011321",
      "enable": "y",
      "blacklist": "n",
      "createdAt": "2023-03-20T01:42:32.325Z",
      "updatedAt": "2023-03-20T01:42:32.325Z",
      "__v": 0
    }
  ]
}
```

### GET Request URL

- In this case, worldlink is ownership of a company name and we get data of username lakpa stored inside this collection.

Get http://localhost:3000/external/fcm/registration/worldlink/lakpa

Response

```json
{
  "message": "OK",
  "error": false,
  "code": 200,
  "result": [
    {
      "_id": "6417b8dd4f608d599b79b6cd",
      "registration_id": "1",
      "client_username": "lakpa",
      "device_os": "Android",
      "device_name": "Samsung",
      "app_version": "2023012016",
      "app_version_code": "",
      "logged_cell_number": "9803011321",
      "enable": "y",
      "blacklist": "n",
      "createdAt": "2023-03-20T01:37:33.962Z",
      "updatedAt": "2023-03-20T01:37:33.962Z",
      "__v": 0
    }
  ]
}
```

### PUT Request URL

- In this case, worldlink is ownership of a company name and we can update user data of username lakpa.

PUT http://localhost:3000/external/fcm/registration/worldlink/lakpa

Request

```json
{
  "registration_id": "1",
  "client_username": "lakpa",
  "device_os": "ANDROID",
  "device_name": "Redmi",
  "app_version": "2023010215",
  "app_version_code": "",
  "logged_cell_number": "9801234567",
  "enable": "y",
  "blacklist": "n"
}
```

Response

```json
{
  "message": "OK",
  "error": false,
  "code": 200,
  "result": "lakpa is updated."
}
```

### DELETE Request URL

- In this case, worldlink is ownership of a company name and we can delete user data of username lakpa.

DELETE http://localhost:3000/external/fcm/registration/worldlink/lakpa

Response

```json
{
  "message": "OK",
  "error": false,
  "code": 200,
  "result": "lakpa has been deleted."
}
```

## POST Request URL to register new users

- In this case, worldlink is ownership of a company name which become a collection name and then users data is stored inside this collection. [Insert 50K data in the database]

POST http://localhost:3000/external/fcm/registration/worldlink/post

Response

```json
{
  "message": "OK",
  "error": false,
  "code": 200,
  "result": "Success: 23098 and Failure: 28073"
}
```

> Note: It might take a bit long due to more numbers of data.

## Developer: Lakpa Futi Lama

## Contact: lakpa.lama4433@gmail.com

## Thank You
