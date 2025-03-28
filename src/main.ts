import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require("cors");

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    cors({
      origin: "http://localhost:4200",
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Rhabit API")
    .setDescription("API documentation for Rhabit Habit Tracker")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
