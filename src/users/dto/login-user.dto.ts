import { IsEmail,IsNotEmpty} from 'class-validator';
export class LoginUserDto{
  // Basic Validation
    @IsEmail()
    readonly Email : string;
    @IsNotEmpty()
    readonly Password : string;
}