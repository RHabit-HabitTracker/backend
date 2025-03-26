import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Habit } from "./habit.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { HabitEntry } from "./habit-entry.entity";

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Habit)
    private readonly habitsRepository: Repository<Habit>,
    @InjectRepository(HabitEntry)
    private readonly habitEntryRepository: Repository<HabitEntry>
  ) {}

  async create(id: number, habit: Habit): Promise<Habit> {
    const owner = await this.userRepository.findOneBy({ id });
    if (!owner) {
      throw new NotFoundException();
    }
    habit.owner = owner;
    const savedHabit = await this.habitsRepository.save(habit);

    // Automatische Erstellung der HabitEntries basierend auf frequency
    const entries = this.generateHabitEntries(savedHabit);
    await this.habitEntryRepository.save(entries);

    const emptyOwner = new User();
    emptyOwner.id = owner.id;
    savedHabit.owner = emptyOwner;

    return savedHabit;
  }

  async readAll(id: number): Promise<Habit[]> {
    var result = await this.habitsRepository.find({
      where: { owner: { id: id } },
      relations: {
        owner: false,
      },
    });
    return result;
  }

  async readOne(id: number): Promise<Habit | null> {
    const result = await this.habitsRepository.find({
      where: { id },
      relations: {
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

  private generateHabitEntries(habit: Habit): HabitEntry[] {
    const entries: HabitEntry[] = [];
    let currentDate;
    console.log(habit.startDate);
    if (!habit.startDate) {
      currentDate = new Date();
    } else {
      currentDate = new Date(habit.startDate);
    }

    console.log(currentDate);
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    while (currentDate <= oneYearLater) {
      const entry = new HabitEntry();
      entry.habit = habit;
      entry.date = new Date(currentDate);
      entry.completed = false;
      entry.notes = "";

      entries.push(entry);

      // Je nach Häufigkeit das Datum anpassen
      switch (habit.frequency) {
        case "daily":
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case "weekly":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "monthly":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }

    return entries;
  }
}
