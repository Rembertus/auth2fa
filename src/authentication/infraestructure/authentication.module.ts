import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from '@app/authentication/infraestructure/authentication.controller';
import { AuthenticationService } from '@app/authentication/infraestructure/authentication.service';
import { UserEntity } from '@app/user/user/domain/model/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})

export class AuthenticationModule {}
