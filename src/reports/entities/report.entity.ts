import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @ApiProperty({ example: 'http://www.google.com', description: 'Raw url input from user.' })
  raw: string;

  @Column()
  @Index()
  @ApiProperty({ example: 'www.google.com', description: 'Machine parsed only hostname.' })
  host: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated: Date;
}
