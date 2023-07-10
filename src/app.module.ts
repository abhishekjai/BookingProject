import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path'

console.log( join(__dirname, './entities/*.entity.ts'))

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory: (configService: ConfigService) => ({
        type: 'mysql' as 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/entities/**.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CinemaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
