import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from '@app/authentication/infraestructure/authentication.service';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { LoginTwoFactorDto } from '@app/authentication/domain/dto/two-factor.dto';

@Controller('')
export class AuthenticationController {

	/**
	 * Inyeccion de dependencias.
	 * @param authenticationService 
	 */
	constructor(private readonly authenticationService: AuthenticationService) { }
	
	@UsePipes(new ValidationPipe({ whitelist: true }))	
	@Post('/login2fa')
  async login2fa(@Body() loginTwoFactorDto: LoginTwoFactorDto): Promise<MessageResponse> {
		
		return await this.authenticationService.loginTwoFactor(loginTwoFactorDto);
  }
}
