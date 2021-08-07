import {
  Column,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm'
import {
  Exclude,
  Expose
} from 'class-transformer'
import { BaseEntity } from './base.entity'
import { IsNotEmpty, IsString } from 'class-validator';
@Entity({
  name: 'users'
})
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
	@IsString()
	@IsNotEmpty()
  public id: string;

  @Unique(['email'])
  @Column({ type: 'varchar', unique: true })
  public email: string

  @Column()
  public first_name: string

  @Column()
  public last_name: string

  @Column()
  public password: string

  @Column({
    default: 0
  })
  public status: boolean

  @Expose()
  get fullName(): string {
    return `${this.first_name} ${this.last_name}`
  }
}
