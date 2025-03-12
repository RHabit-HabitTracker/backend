import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcryptjs/umd/types";
import { LoginUser } from "src/user/partialuser.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async login(loginUser: LoginUser): Promise<User> {
    const email = loginUser.email;
    const password = loginUser.password;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      // If no user is found, throw an exception
      throw new NotFoundException("Invalid credentials");
    }

    // Step 2: Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      // If the password is incorrect, throw an exception
      throw new NotFoundException("Invalid credentials");
    }

    // Step 3: Return the user if the login is successful
    return user;
  }
}
