import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Habit } from "./habit.entity";
import { Repository } from "typeorm";

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>
  ) {}

  async create(habit: Habit): Promise<Habit> {
    return await this.habitsRepository.save(habit);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Habit[]> {
    return await this.habitsRepository.find();
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
