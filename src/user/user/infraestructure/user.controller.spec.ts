import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as supertest from 'supertest';

import { UserModule } from '@app/user/user/infraestructure/user.module';
import { ConfigModule } from '@nestjs/config';

jest.setTimeout(20000);

describe('Users', () => {
  let app: INestApplication;  
  var userId: number;
  var firstname = `firstname${Math.floor(Math.random() * 999999)}`;  
  var lastname = `lastname${Math.floor(Math.random() * 999999)}`;  
  var email = `user${Math.floor(Math.random() * 999999)}@gmail.com`;  
  var mypassword = `pas${Math.floor(Math.random() * 999999)}`;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          expandVariables: true,
        }),
        UserModule,
        TypeOrmModule.forRoot({
          type: process.env.DB_TYPE as any,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,          
          entities: ['./**/*.entity.ts', './**/*.view.ts'],          
          synchronize: false,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('POST /users', () => {
    it('should return a Data User', async () => {
      const { body } = await supertest
        .agent(process.env.SERVER_TEST)
        .post('/users')
        .send({ firstname: firstname, lastname: lastname, email: email, mypassword: mypassword })
        .set('Accept', 'application/json')
        .expect(201);

      userId = parseInt(body.response.id);
      expect(userId).toEqual(expect.any(Number));
    });
  });

  describe('GET /users/generate2fa/{userId}', () => {
    it('should return a qrcode for Google Authenticator', async () => {      
      const { body } = await supertest
        .agent(process.env.SERVER_TEST)
        .get('/users/generate2fa/' + userId)        
        .set('Accept', 'application/json')
        .expect(200);
                
      expect(body.statusCode).toEqual(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });  
});
