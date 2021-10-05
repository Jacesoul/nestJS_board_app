require('dotenv').config();
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';

@Injectable() // JwtStrategy를 다른곳에서도 주입을 해서 사용을 할수 있게 하기 위해 사용
export class JwtStrategy extends PassportStrategy(Strategy) {
  // jwt strategy를 사용하기 위해서 Strategy를 넣어준다. 이름은 그냥 Strategy이지만 import 되는 곳은 passport-jwt이다.
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // 부모의 컴포넌트를 사용하기 위해서 super를 사용한다.
    super({
      secretOrKey: 'Secret1234',
      // auth.module에서 넣어준것과 동일하게 넣어준다. JWT 토큰이 유효한지 체크할때 사용을 한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 토큰을 인증할때 어디에서 가져오는지 설정(헤더에 bearer token의 타입으로 가져옴)
    });
  }

  // 위에서 토큰이 유효한지 체크가 되면 validate 메소드에서 payload에 있는 유저이름이 데이터베이스에 있는 유저인지 확인후 있다면 유저객체를 return 값으로 던져줍니다.
  // return값은 @UseGards(AuthGarud())를 이용한 모든 요청의 Request Object에 들어갑니다.

  async validate(payload) {
    // 토큰의 payload가 전달이 됨
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
