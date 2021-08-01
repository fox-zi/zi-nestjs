import {Type} from "class-transformer";
import {IsDate, IsNotEmpty, IsString} from "class-validator";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	PrimaryGeneratedColumn,
} from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @Column()
	@Type(() => Date)
	@IsDate()
	public created_at?: Date;

	@Column()
	@Type(() => Date)
	@IsDate()
	public updated_at?: Date;

	@BeforeInsert()
	protected generateDateBeforeInsert(): void {
		this.created_at = new Date();
		this.updated_at = this.created_at;
	}

	@BeforeUpdate()
	protected generateDateBeforeUpdate(): void {
		this.updated_at = new Date();
	}
}
