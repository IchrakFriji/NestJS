import {ConfigModule,ConfigService} from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import config from '../config/keys'



@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: 'SECRET',
      signOptions:{expiresIn:'10000s'}
    }),
    
  }),],
  providers: [AuthService],
  exports:[AuthService],
})
export class AuthModule {}
