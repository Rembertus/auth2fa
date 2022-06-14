// Descripción : Componente para el proceso de autenticacion con Google Authenticator.
// Autor   		 : Remberto Gonzales Cruz (rembertus@gmail.com)

import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@app/app.controller';
import { AuthenticationModule } from '@app/authentication/infraestructure/authentication.module';
import { UserModule } from '@app/user/user/infraestructure/user.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: !ENV ? '.env' : `.env.${ENV}` }),    
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/**/*.view{.ts,.js}'],      
    }),    
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule {}
