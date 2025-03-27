import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginUser: LoginUserDto): Promise<{ token: string }> {
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
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(loginUser: LoginUserDto): Promise<User> {
    const email = loginUser.email;
    const password = loginUser.password;
    const salt = await bcrypt.genSalt();

    if (!email || !password) {
      throw new BadRequestException("Parameters missing");
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException("Email is allready in use");
    }

    const passwordHash = await bcrypt.hash(password, salt);

    const partialUser: CreateUserDto = { email, passwordHash };

    console.log(partialUser);
    return await this.userService.create(partialUser);
  }
}
