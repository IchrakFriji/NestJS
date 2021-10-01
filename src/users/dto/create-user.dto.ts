import { LoginUserDto } from "./login-user.dto";
import { IsString} from 'class-validator';
export class CreatUserDto extends LoginUserDto{
    @IsString()
    readonly FullName: string;
    
}