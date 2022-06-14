import { HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import { EntityRepository, QueryRunner, Repository } from "typeorm";
import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";
import { UserCreateDto } from "@app/user/user/domain/dto/user-create.dto";
import { UserEntity } from "@app/user/user/domain/model/user.entity";
import { MessageResponse } from '@app/shared/domain/model/message.response';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  /**
 * Persiste en la Base de Datos la entidad.
 * @param userDto Datos de la Entidad a persistir.
 * @returns MessageResponse
 */
  public async createUser(userDto: UserCreateDto, queryRunner: QueryRunner): Promise<MessageResponse> {
    
    const user = new UserEntity();
    Object.assign(user, userDto);
      
    try {
      user.firstname = user.firstname.trim();
      user.lastname = user.lastname.trim();
      user.email = user.email.trim();
      user.status = StatusEnum.Active;

      await queryRunner.manager.save(user);
    } catch (e) {
      return new MessageResponse(HttpStatus.UNPROCESSABLE_ENTITY, MessageEnum.ENTITY_ERROR_CREATE, null);
    }

    delete user.mypassword;
    return new MessageResponse(HttpStatus.OK, MessageEnum.USER_CREATED, user);
  }

  /**
   * Modifica y persiste en la Base de Datos la entidad.
   * @param usuarioDto Datos DTO recibidos.
   * @param usuario Datos de la Entidad a persistir.
   * @returns MessageResponse
   */
  public async updateUser(userDto: UserCreateDto, user: UserEntity, queryRunner: QueryRunner): Promise<MessageResponse> {

    let newPassword = user.mypassword;
    if (userDto.mypassword != null) {
      if (userDto.mypassword != user.mypassword) {
        newPassword = await hash(userDto.mypassword, parseInt(process.env.ROUNDS_SECURITY));
      }
    }

    Object.assign(user, userDto);
    user.mypassword = newPassword;

    try {
      await queryRunner.manager.save(user);
    } catch (e) {
      return new MessageResponse(HttpStatus.UNPROCESSABLE_ENTITY, MessageEnum.ENTITY_ERROR_CREATE, null);
    }

    delete user.mypassword;
    return new MessageResponse(HttpStatus.OK, MessageEnum.USER_UPDATE, user);
  }

  /**
   * Elimina y persiste en la Base de Datos.
   * @param user Datos de la Entidad a persistir.
   * @returns MessageResponse
   */
  public async deleteUser(user: UserEntity): Promise<MessageResponse> {
    user.status = StatusEnum.Deleted;

    try {
      await user.save();
    } catch (e) {
      return new MessageResponse(HttpStatus.UNPROCESSABLE_ENTITY, MessageEnum.ENTITY_ERROR_CREATE, null);
    }

    return new MessageResponse(HttpStatus.OK, MessageEnum.USER_DELETE, { id: user.id });
  }
}
