# auth2fa
Nest.JS, Authentication with Google Authenticator, only Backend

## Script for table in Postgres - Schema: "user",
```javascript 
CREATE TABLE "user"."user" (
	id bigserial NOT NULL,
	firstname varchar(50) NOT NULL DEFAULT ''::character varying,
	lastname varchar(100) NOT NULL DEFAULT ''::character varying,
	email varchar(100) NOT NULL,
	mypassword varchar(400) NOT NULL DEFAULT ''::character varying,
	secret2fa varchar(150) NULL,
	status int2 NOT NULL DEFAULT 0,
	CONSTRAINT pk_user PRIMARY KEY (id)
);
```
  
## Instructions
npm install  
npm install bcrypt  // for encryption password  
npm run start:dev  

## Tests
npm run test -t user.controller

### EndPoints for Postman
User Create
POST http://127.0.0.1:3010/api/users  
Body-Json
```javascript 
{
    "firstname": "jhon",
    "lastname": "doe",
    "email": "jhoncito@gmail.com",
    "mypassword": "a1b2c3d4"
}
```
Generate QRCODE for Google Authenticator
http://127.0.0.1:3010/api/users/generate2fa/{USERID}
```javascript 
{
    "statusCode": 200,
    "message": "Datos devueltos correctamente.",
    "response": "data:image/png;base64,iVBORw0KGgoAAAAN.....
}
```

Convert Base64 to Image for QrCode
https://codebeautify.org/base64-to-image-converter

### EndPoints for Postman
Login 2fa
POST http://127.0.0.1:3010/api/login2fa  
Body-Json
```javascript 
{
    "email": "jhoncito@gmail.com",
    "mypassword": "a1b2c3d4",
		"code": 123456						// Code from Google Authenticator
}
```

## For Support
- [Remberto Gonzales Cruz](rembertus@gmail.com)
