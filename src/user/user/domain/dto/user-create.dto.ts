import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
    
  @IsNotEmpty({ message: 'firstname no debe ser vacío' })
	@IsString({ message: 'firstname debe ser de tipo cadena' })
	@MaxLength(50, { message: 'firstname es muy largo' })
  @MinLength(3, { message: 'firstname es muy corto' })
  readonly firstname: string;

  @IsNotEmpty({ message: 'lastname no debe ser vacío' })
	@IsString({ message: 'lastname debe ser de tipo cadena' })
	@MaxLength(100, { message: 'lastname es muy largo' })
  @MinLength(3, { message: 'lastname es muy corto' })
  readonly lastname: string;

  @IsNotEmpty({ message: 'email no debe ser vacío' })
	@IsEmail({ message: 'email debe ser de tipo cadena' })
	@MaxLength(100, { message: 'email es muy largo' })
  @MinLength(6, { message: 'email es muy corto' })
  readonly email: string;  

  @IsNotEmpty({ message: 'mypassword no debe ser vacío' })
	@IsString({ message: 'mypassword debe ser de tipo cadena' })
	@MaxLength(400, { message: 'mypassword es muy largo' })
  @MinLength(6, { message: 'mypassword es muy corto' })
  readonly mypassword: string;
}
