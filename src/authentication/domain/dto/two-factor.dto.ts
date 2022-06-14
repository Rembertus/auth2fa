import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginTwoFactorDto {

  @IsEmail({ message: 'email debe ser de tipo email' })
  @IsNotEmpty({ message: 'email no debe ser vacío' })
  readonly email: string;

  @IsNotEmpty({ message: 'mypassword no debe ser vacía' })
  @IsString({ message: 'mypassword debe ser de tipo cadena' })
  readonly mypassword: string;

  @IsNotEmpty({ message: 'Code no debe ser vacío' })
	@IsNumber({}, { message: 'Code debe ser de tipo numérico' })
  readonly code: number;
}
