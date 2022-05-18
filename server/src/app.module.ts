import { MongooseModule } from '@nestjs/mongoose';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
// Декоратор @Module() предоставляет метаданные, которые Nest использует для организации структуры приложения. Корневой модуль нужен для построения графа приложения
//контроллер для логики взаимодействия с запросами и ответами, описания типов запросов(гет пут пост и тд), работы с входными параметрами (тело запроса)
//сервис - описание логики запросов. получение из базы, возврат данных и т.д.
@Module({
  imports: [
    TrackModule,
    FileModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.ryvvm.mongodb.net/spotifyClone?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({rootPath: resolve(__dirname, 'static')}),
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
