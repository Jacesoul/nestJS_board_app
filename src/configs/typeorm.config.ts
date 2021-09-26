import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'dnwltjfmq',
  database: 'board',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //엔티티를 이용해서 데이터베이스 테이블을 생성해줍니다. 그래서 엔티티 파일이 어디에 있는지 설정해줍니다.
  synchronize: true,
};
