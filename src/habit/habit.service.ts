import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Habit } from "./habit.entity";
import { EntityManager, Repository } from "typeorm";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/user/user.entity";

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Habit)
    private readonly habitsRepository: Repository<Habit>
  ) {}

  async create(id: number, habit: Habit): Promise<Habit> {
    const owner = await this.userRepository.findOneBy({ id });
    if (owner != null) {
      habit.owner = owner;
      var result = await this.habitsRepository.save(habit);
    } else {
      throw new NotFoundException();
    }
    return result;
  }

  async readAll(id: number): Promise<Habit[]> {
    var result = await this.habitsRepository.find({
      where: { owner: { id: id } },
    });
    return result;
  }

  async readOne(id: number): Promise<Habit | null> {
    const result = await this.habitsRepository.find({
      where: { id },
      relations: {
        owner: true,
        access: { user: true },
        entries: true,
        tags: true,
      },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Habit>) {
    return await this.habitsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.habitsRepository.delete(id);
  }
}
