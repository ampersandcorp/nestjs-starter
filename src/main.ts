import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { IS_PRODUCTION } from './config';
import { AppModule } from './AppModule';
import { HttpLoggingInterceptor } from './shared/interceptors/HttpLoggingInterceptor';
import { AUTH_HEADER } from './auth/domain/JwtStrategy';

function setupSwaggerDocument(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('1.0.0')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: AUTH_HEADER,
      },
      AUTH_HEADER,
    )
    .addTag('Misc', 'Miscellaneous APIs')
    .build();

  const options: SwaggerCustomOptions = {
    customCss: `body { background: transparent }
    .swagger-ui .topbar { display: none; }`,
    customSiteTitle: 'API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, options);
}

async function bootstrap(): Promise<void> {
  process.env.TZ = 'Asia/Seoul';

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpLoggingInterceptor());
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  if (!IS_PRODUCTION) {
    setupSwaggerDocument(app);
  }

  app.enableCors({
    origin: [
      'http://localhost',
      /^https?:\/\/192\.168\.0\.\d{1,3}(:\d{1,5})?$/gi,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await app.listen(80);
}
bootstrap().then();
