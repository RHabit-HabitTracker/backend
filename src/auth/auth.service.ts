import {
  BadRequestException,
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
import { UpdateEmailCredentialsDto } from "src/user/dto/update-email-credentials.dto";
import { UpdatePasswordCredentialsDto } from "src/user/dto/update-password-credentials.dto";

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
      throw new BadRequestException("Email is already in use");
    }

    const passwordHash = await bcrypt.hash(password, salt);

    const partialUser: CreateUserDto = { email, passwordHash };

    console.log(partialUser);
    return await this.userService.create(partialUser);
  }

  async updateEmail(updateEmailDto: UpdateEmailCredentialsDto): Promise<{ success: boolean }> {
    const { currentEmail, newEmail, password } = updateEmailDto;

    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { email: currentEmail } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password");
    }

    // Check if new email already in use
    const existingUser = await this.usersRepository.findOne({ where: { email: newEmail } });
    if (existingUser) {
      throw new BadRequestException("Email address is already in use");
    }

    // Update email via UserService
    await this.userService.update(user.id, { email: newEmail });

    return { success: true };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordCredentialsDto): Promise<{ success: boolean }> {
    const { email, currentPassword, newPassword } = updatePasswordDto;

    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Check current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException("Current password is invalid");
    }

    // Update password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    
    // Update via UserService
    await this.userService.update(user.id, { passwordHash });

    return { success: true };
  }
}
