import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { inspect } from "node:util";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./user/user.entity";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";
import { HabitModule } from "./habit/habit.module";
import { Habit } from "./habit/habit.entity";
import { Tag } from "./tag/tag.entity";
import { HabitService } from "./habit/habit.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { UserController } from "./user/user.controller";
import { TagService } from "./tag/tag.service";
import { TagController } from "./tag/tag.controller";
import { TagModule } from "./tag/tag.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // (!) disable for production
    }),
    UserModule,
    HabitModule,
    AuthModule,
    TagModule,
  ],
  controllers: [AppController, AuthController, UserController, TagController],
  providers: [AppService, AuthService, UserService, TagService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly habitService: HabitService
  ) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    try {
      const user = new User();
      user.email = "m@m.de";
      user.passwordHash =
        "$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2"; // "password"
      const { id: userId } = await this.userService.create(user);
      const habit = new Habit();
      habit.title = "title";
      habit.description = "description";
      habit.owner = user;
      habit.isPublic = true;
      habit.frequency = "monthly";
      const tag = new Tag();
      tag.name = "tag1";
      tag.color = "#00ffff";
      habit.tags = [tag];

      const { id: habitId } = await this.habitService.create(1, habit);

      const userRead = await this.userService.readOne(userId);
      console.log(inspect(userRead, true, 10, true));

      const habitRead = await this.habitService.readOne(habitId);
      console.log(inspect(habitRead, true, 10, true));
    } catch {
      console.error("E-Mail allready exists");
    }
  }
}
