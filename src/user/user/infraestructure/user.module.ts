import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '@app/user/user/domain/model/user.entity';
import { UserRepository } from '@app/user/user/domain/model/user.repository';
import { UserController } from '@app/user/user/infraestructure/user.controller';
import { UserService } from '@app/user/user/infraestructure/user.service';
import { AuthenticationService } from '@app/authentication/infraestructure/authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserRepository,      
    ]),
    ConfigModule.forRoot({
      expandVariables: true,
    }),    
  ],
  controllers: [UserController],
  providers: [UserService, AuthenticationService],
  exports: [UserService],
})
export class UserModule { }
