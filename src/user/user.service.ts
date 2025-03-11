import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginUser } from './partialuser.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async login(loginUser: LoginUser): Promise<User> {
    const email = loginUser.email;
    const password = loginUser.password;
    const user = await this.usersRepository.findOne({ where: { email } });
  
    if (!user) {
      // If no user is found, throw an exception
      throw new NotFoundException('Invalid credentials');
    }
  
    // Step 2: Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  
    if (!isPasswordValid) {
      // If the password is incorrect, throw an exception
      throw new NotFoundException('Invalid credentials');
    }
  
    // Step 3: Return the user if the login is successful
    return user;
  }
  

  async readOne(id: number): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: {
        ownedHabits: { entries: true },
        habitsAccess: { habit: true },
      },
    });
    if (result.length === 0) {
      throw new NotFoundException();
    }
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<User>) {
    return await this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
