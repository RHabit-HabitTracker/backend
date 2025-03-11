import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiPropertyOptional({
    example: '0',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({
    example: '2025-03-11T10:35:02.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiPropertyOptional({
    example: '2025-03-11T10:35:02.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
