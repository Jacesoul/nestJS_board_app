import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    //유저를 인증하기 위해 사용할 기본 strategy를 명시해주기
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //jwt 인증 부분을 담당, 그리고 주로 sign()을 위한 부분이다.
    JwtModule.register({
      secret: process.env.SECRET_KEY || jwtConfig.secret, // jwt토큰 생성시의 비밀키
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  // JwtStrategy를 이 Auth 모듈에서 사용할수 있게 등록
  providers: [AuthService, JwtStrategy],
  // JwtStrategy, PassportModule를 다른 모듈에서 사용할수 있게 등록
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
