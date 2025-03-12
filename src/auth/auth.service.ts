import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { LoginUser } from "../user/partialuser.entity";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(loginUser: LoginUser): Promise<{ access_token: string }> {
    const email = loginUser.email;
    const password = loginUser.password;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new NotFoundException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
