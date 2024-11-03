import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'root',
  database: process.env.POSTGRES_DB || 'database',
  synchronize: false,
  entities: ['dist/src/entities/*.entity{.js,.ts}'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/*.seeder.js'],
  factories: ['dist/db/factories/*.factory.js'],
};

export default new DataSource(dataSourceOptions);
