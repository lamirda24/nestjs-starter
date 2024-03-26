import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERNS', 'ADMIN', 'ENGINEER'], {
    message: 'Valid Role Required',
  })
  role: 'INTERNS' | 'ADMIN' | 'ENGINEER';
}
