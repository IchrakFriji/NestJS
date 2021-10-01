import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from './schemas/user.schema';

import { Model } from 'mongoose';
import {map,switchMap} from 'rxjs/operators'

 import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { from, Observable } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private  readonly usersModel:Model<User>,private authService:AuthService){}
    //get users async function
    async findAll(): Promise<User[]>{
        return await this.usersModel.find();
    }
    // get user by id 
    findOne(id: string): Observable<User>{
      return  from(this.usersModel.findOne({ id}));
    }
    // add user
     create (user:User): Observable<User>{
           // Find email
        return this.mailExist(user.Email).pipe(
            switchMap((exist:boolean)=>{
                if(!exist){ return this.authService.hashPassword(user.Password).pipe(
                    switchMap((PasswordHash:string)=>{
                        user.Password= PasswordHash;
                        const newUser= new this.usersModel(user)
                       return from(newUser.save());
                       
                    })
                )
                }
                else{ throw new HttpException(' Email already exist',HttpStatus.CONFLICT);}
            })
        )
        
        
    }
    //login
     login(loginUserDto:LoginUserDto):Observable<String>{
         return this.findUserByEmail(loginUserDto.Email).pipe(
             switchMap((user:User)=>{
               if(user){  
                    return this.validePassword(loginUserDto.Password,user.Password).pipe(
                        switchMap((passwordsMatch:boolean)=>{
                    if(passwordsMatch){return this.findOne(user.id).pipe(
                        switchMap((user:User)=>this.authService.generateJwt(user))
                    )}
                    else{ throw new HttpException('Password is wrong',HttpStatus.UNAUTHORIZED);}
                })
             )}
             else{
                throw new HttpException(' Email not found',HttpStatus.NOT_FOUND);
             }
            })
         )
     }
    async delete (id: string):Promise<User>{
        return await this.usersModel.findByIdAndRemove(id);
    }
    async update( id:string,user: User):Promise<User>{
        return await this.usersModel.findByIdAndUpdate(id, user,{new:true});

    }
    private findUserByEmail(Email: string):Observable<User>{
        return from( this.usersModel.findOne({Email}));
    }
    //valide password
    private validePassword(Password:string,storedPasswordHash:string):Observable<boolean>{
         return this.authService.comparePassword(Password,storedPasswordHash);
    }
    // find email 
   private mailExist(Email:string):Observable<boolean>{
       return from(this.usersModel.findOne({Email})).pipe(
map((user:User)=>{
    if(user)
 {
    return true;
 }
 else
  {
     return false;
  }

})
   )}
}
