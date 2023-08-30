import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpLoggingInterceptor } from './shared/interceptors/HttpLoggingInterceptor';

function setupSwaggerDocument(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('0.1')
    .addTag('Misc', 'Miscellaneous APIs')
    .build();

  const options: SwaggerCustomOptions = {
    customCss: `body { background: transparent }
    .swagger-ui .topbar img { margin-top: 28px; }
    .swagger-ui .topbar { background-color: white }`,
    customSiteTitle: 'API Documentation',
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, options);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  setupSwaggerDocument(app);

  await app.listen(80);
}
bootstrap();
