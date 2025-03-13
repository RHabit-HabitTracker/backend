import { Column, Entity } from "typeorm";
import { BaseEntity } from "../shared/base";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Tag extends BaseEntity {
  @ApiProperty({
    example: "Tag1",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "red",
  })
  @Column()
  color: string;
}
