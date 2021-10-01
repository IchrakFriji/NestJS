import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from 'src/users/schemas/user.schema';
const bcrypt =require('bcrypt')
@Injectable()
export class AuthService {
  constructor( private readonly jwtService:JwtService){}
  generateJwt(user :User):Observable<string>{
      return from(this.jwtService.signAsync({user}));
  }
    hashPassword(Password:string):Observable<string>{
        return from<string>(bcrypt.hash(Password,12));
    }
    comparePassword(Password:string,storedPasswordHash: string):Observable<any>{
        return from(bcrypt.compare(Password,storedPasswordHash))
    }
}
