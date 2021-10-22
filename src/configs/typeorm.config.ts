import * as config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //엔티티를 이용해서 데이터베이스 테이블을 생성해줍니다. 그래서 엔티티 파일이 어디에 있는지 설정해줍니다.
  synchronize: dbConfig.synchronize,
};
