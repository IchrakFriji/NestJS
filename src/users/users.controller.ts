import { Controller,Get,Post,Put,Delete,Body,Param, HttpCode } from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { Observable, switchMap } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    // Get Users
    @Get()
    findAll():Promise<User[]>{
        return this.usersService.findAll();
    }
    //Get user by Id
    @Get(':id')
    findOne(@Param('id') id): Observable<User>{
        return this.usersService.findOne(id);
    }
    // add user
    @Post()
    create(@Body() creatUserDto:CreatUserDto):Observable<User>{
        return this.usersService.create(creatUserDto);
    }
    //login
    @Post('login')
    @HttpCode(200)
    login(@Body() loginUserDto:LoginUserDto):Observable<String>{
         return this.usersService.login(loginUserDto);
    }
    // update user by id
    @Put(':id')
    update(@Param('id') id,@Body() updateUserDto:CreatUserDto): Promise<User>{
        return this.usersService.update(id,updateUserDto);
    }
    // delete user by id
    @Delete(':id')
    delete(@Param('id') id): Promise<User>{
        return this.usersService.delete(id)
    }
}
