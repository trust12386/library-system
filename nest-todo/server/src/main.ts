import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ReportLogger } from './log/ReportLogger';
import {join} from 'path'
import { HttpExceptionFilter } from './error/http-exception.filter';
import { AllExceptionFilter } from './error/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './log/log.interceptor';
import { TransformInterceptor } from './transform/transform.interface';

const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('待办事项')
    .setDescription('nest-todo的API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

async function bootstrap() {
  const reportLogger = new ReportLogger()

  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    cors:{
      origin:['http://localhost','http://localhost:3000'],
      credentials:true
    },
    bufferLogs:true,
    logger:reportLogger
  });

  app.useStaticAssets(join(__dirname,'..','upload_dist'))

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new HttpExceptionFilter(),new AllExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor()
  )

  setupSwagger(app)

  await app.listen(4200);
}
bootstrap();
