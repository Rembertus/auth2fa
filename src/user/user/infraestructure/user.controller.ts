import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@app/user/user/infraestructure/user.service';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { UserCreateDto } from '@app/user/user/domain/dto/user-create.dto';

@Controller('users')
export class UserController {

  /**
   * Inyeccion de dependencias.
   * @param userService 
   */
  constructor(private readonly userService: UserService) { }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('')
  async create(@Body() userDto: UserCreateDto): Promise<MessageResponse> {
    
    const response = await this.userService.create(userDto);
    return response;
  }

  @UsePipes(new ValidationPipe())
  @Get('')  
  async gets(): Promise<MessageResponse> {

    const response = await this.userService.gets();
    return response;
  }
  
  @Get('/:id')
  async get(@Param('id', ParseIntPipe) userId: number): Promise<MessageResponse> {

    const response = await this.userService.get(userId);
    return response;
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put('/:id')
  async update(@Body() userDto: UserCreateDto, @Param('id', ParseIntPipe) userId: number): Promise<MessageResponse> {
    
    return await this.userService.update(userId, userDto);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) userId: number): Promise<MessageResponse> {

    const response = await this.userService.delete(userId);
    return response;
  }

  @Get('/generate2fa/:id')
  async generate2fa(@Param('id', ParseIntPipe) userId: number): Promise<MessageResponse> {

    const otpauthUrl = await this.userService.generate2fa(userId);
    return await this.userService.pipeQrCodeStream(otpauthUrl.response.otpauthUrl);
  }
}
