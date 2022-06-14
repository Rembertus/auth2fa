import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { authenticator } from 'otplib';
import { StatusEnum } from '@app/shared/infraestructure/enums/status.enum';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { UserEntity } from '@app/user/user/domain/model/user.entity';
import { LoginTwoFactorDto } from '@app/authentication/domain/dto/two-factor.dto';

@Injectable()
export class AuthenticationService {

  /**
   * Inyeccion de Repositorios.
   * @param userRepository   
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,    
  ) { }

  /**
   * Verifica el Codigo generado por la Aplicacion Google Authenticator
   * @param twoFactorAuthenticationCode Codigo introducido
   * @param user datos del user.
   * @returns 
   */
  private isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: UserEntity) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.secret2fa
    })
  }

  /**
   * Acceso a la Aplicacion
   * @param userId Identificador de user
   * @param codigo Codigo devuelto por Google Authenticator
   * @returns 
   */
  async loginTwoFactor(loginTwoFactorDto: LoginTwoFactorDto): Promise<MessageResponse> {

    const user = await this.userRepository.findOne({
      select: ['id', 'firstname', 'lastname', 'email', 'mypassword', 'secret2fa'],
      where: { email: loginTwoFactorDto.email, status: StatusEnum.Active }
    });

    if (!user) {
      return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.CREDENTIALS_INVALID, null);
    }    
    
    const isCodeValid = this.isTwoFactorAuthenticationCodeValid(
      loginTwoFactorDto.code.toString(), user
    );        

    if (!isCodeValid) {
      return new MessageResponse(HttpStatus.UNPROCESSABLE_ENTITY, MessageEnum.TWO_FACTOR_AUTHENTICATION_ERROR, null);
    }

    delete user.mypassword;
    delete user.secret2fa;

    const messageResponse = new MessageResponse();
    messageResponse.statusCode = HttpStatus.OK;
    messageResponse.message = MessageEnum.ENTITY_SELECT;
    messageResponse.response = {
      ...user,
      token: this.generateJwt(user),
    };

    return messageResponse;
  }

  /**
   * Obtiene los datos de un user para acceso.
   * @param userId Identificador de user.
   * @returns Datos del user.
   */
  public async getUserLogin(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { id: userId, status: StatusEnum.Active }
    );

    if (!user) {
      throw new NotFoundException(MessageEnum.ACCESS_INVALID);
    }

    delete user.mypassword;
    return user;
  } 

  /**
   * Genera un token JWT para un user.
   * @param user Datos del user.
   * @returns Token.
   */
  private generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME + 's' },
    );
  }
}

