import { Controller } from '@nestjs/common';
import { HabitService } from './habit.service';

@Controller('habit')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}
}
