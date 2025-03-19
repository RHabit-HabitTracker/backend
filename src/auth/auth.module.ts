import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { UserService } from "src/user/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserService,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "30m" },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
